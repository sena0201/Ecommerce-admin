function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  return <>{params.productId}</>;
}

export default ProductDetail;
