import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>My Post: {id}</div>;
}
