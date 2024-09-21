"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidateTag } from "next/cache";
import { productSchema, ProductType } from "../../add/schema";

// TODO: id에서 url query로 받아와 데이터를 수정하고 revalidate
// https://velog.io/@jma1020/Next-NextJS-%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%84-query-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%9D%B4%EB%8F%99%EB%B0%A9%EB%B2%95-Link-nextrouter
export default function EditProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    if (!RegExp(/^image\/(jpe?g|png)$/).test(files[0].type)) return;
    if (2_000_000 < files[0].size) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "photo",
        `https://imagedelivery.net/1IWmytYXYQGAWu907ilrGg/${id}
    `.trim(),
      );
    }
  };
  const onValid = async () =>
    await handleSubmit(async (data: ProductType) => {
      if (!file) return;
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price + "");
      formData.append("description", data.description);
      formData.append("photo", data.photo);
      const errors = await uploadProduct(formData);
      if (errors) {
        /* setError("")*/
      } else {
        revalidateTag("products");
      }
    })();

  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-cover text-neutral-300"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview == "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-sm text-neutral-400">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <Input
          required
          placeholder="제목"
          type="text"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="number"
          required
          placeholder="가격"
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          type="text"
          required
          placeholder="자세한 설명"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
// 1. '/products' 페이지는 사용자 경험을 올리기 위해 상단을 스와이프 하면 재검증 및 새로 고침
// 2. '1'의 동작으로 제품 추가('/products/add')는 'revalidateTag'만으로 '/products' 페이지 갱신
// 3. 제품 삭제 및 수정은 제품 추가와 같이 소유자의 아이템을 수정하는 것이기에  'revalidateTag'로 '/products' 페이지 갱신
