import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

async function getIsOwner(userId: number) {
  // return (await getSession()).id === userId;
}

async function getProductTitle(id: number) {
  console.log("title");
  const product = await db.product.findUnique({
    where: { id },
    select: { title: true },
  });
  return product;
}

async function getProduct(id: number) {
  console.log("product");
  const product = await db.product.findUnique({
    where: { id },
    include: { user: { select: { username: true, avatar: true } } },
  });
  return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const products = await getCachedProductTitle(Number(params.id));
  return {
    title: products?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  isNaN(id) && notFound();
  const product = await getCachedProduct(id);
  if (!product) notFound();
  const isOwner = await getIsOwner(product.userId);
  const onDelete = async () => {
    "use server";
    await db.product.delete({ where: { id } });
    redirect("/products");
  };
  const revalidate = async () => {
    "use server";
    revalidateTag("product-title");
  };
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={`${product.photo}/public`}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-3 border-b border-neutral-700 p-5">
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
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-between bg-neutral-800 p-5 pb-10">
        <span className="text-lg font-semibold">
          {formatToWon(product.price)}
        </span>
        <form action={revalidate}>
          <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
            Revalidate title cache
          </button>
        </form>
        {/* {isOwner ? (
          <form action={revalidate}>
            <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
              Revalidate title cache
            </button>
          </form>
        ) : // <form action={onDelete}>
        //   <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
        //     Delete product
        //   </button>
        // </form>
        null} */}
        <Link
          className="rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { id: true } });
  return products.map(({ id }) => ({ id: id + "" }));
}
