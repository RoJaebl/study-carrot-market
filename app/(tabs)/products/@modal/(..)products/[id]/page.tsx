import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "./Button";
import Link from "next/link";
import { formatToWon } from "@/lib/utils";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import getSession from "@/lib/session";
import Image from "next/image";

async function getIsOwner(userId: number) {
  return (await getSession()).id === userId;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    include: { user: { select: { username: true, avatar: true } } },
  });
  return product;
}

export default async function Modal({ params }: { params: { id: string } }) {
  await new Promise((res) => setTimeout(res, 1000));
  const id = Number(params.id);
  isNaN(id) && notFound();
  const product = await getProduct(id);
  if (!product) notFound();
  const isOwner = await getIsOwner(product.userId);
  const onDelete = async () => {
    "use server";
    await db.product.delete({ where: { id } });
    redirect("/products");
  };
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
      <Button className="absolute right-5 top-5">
        <XMarkIcon className="size-10" />
      </Button>
      <div className="primary-scroll h-1/2 w-full max-w-screen-sm">
        <div className="mx-auto flex w-[500px] flex-col justify-center gap-1 bg-neutral-900">
          <div className="relative size-[500px]">
            <Image
              fill
              src={`${product.photo}/public`}
              alt={product.title}
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-3 border-b border-neutral-700 p-1">
            <div className="size-10 overflow-hidden rounded-full">
              {product.user.avatar !== null ? (
                <Image
                  src={product.user.avatar}
                  width={40}
                  height={40}
                  alt={product.user.username}
                />
              ) : (
                <UserIcon />
              )}
            </div>
            <div>
              <h3>{product.user.username}</h3>
            </div>
          </div>
          <div className="p-1">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p>{product.description}</p>
          </div>
          <div className="sticky bottom-0 left-0 flex items-center justify-between gap-5 rounded-md bg-neutral-800 p-5">
            <span className="text-base font-semibold">
              {formatToWon(product.price)}
            </span>
            {isOwner ? (
              <form action={onDelete}>
                <button className="rounded-md bg-red-500 px-5 py-2.5 text-xs font-semibold text-white">
                  Delete product
                </button>
              </form>
            ) : null}
            <Link
              className="rounded-md bg-orange-500 px-5 py-2.5 text-xs font-semibold text-white"
              href={``}
            >
              채팅하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
