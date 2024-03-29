import Header from "@/components/blocks/header";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductImages from "@/components/blocks/productImages";
import Footer from "@/components/blocks/footer";
import AddToCartButton from "@/components/blocks/addtocart";
import Productsdata from "@/actions/productdata";

const ProductPage = async ({ params }) => {
  console.log(params.slug);
  const slug = params.slug;
  let product;

  try {
    product = await Productsdata(slug);
  } catch (error) {
    console.error("Failed to fetch product:", error);

    return <div className="bg-white">Product not found</div>;
  }

  // if (!product.images || product.images.length === 0) {
  //   return <div className="bg-white">Product not found</div>;
  // }

  const colorOptions = [
    { id: "color-black", value: "black", label: "Black" },
    { id: "color-white", value: "white", label: "White" },
    { id: "color-blue", value: "blue", label: "Blue" },
  ];

  const sizeOptions = [
    { id: "size-xs", value: "xs", label: "XS" },
    { id: "size-s", value: "s", label: "S" },
    { id: "size-m", value: "m", label: "M" },
    { id: "size-l", value: "l", label: "L" },
    { id: "size-xl", value: "xl", label: "XL" },
  ];

  if (!product[0].id == undefined) {
    return <div className="bg-white">Product not found</div>;
  }

  const addtocartbutton = {
    id: product[0].id,
    name: product[0].name,
    price: product[0].price,
  };

  console.log(product[0].id);
  return (
    <div>
      <Header />
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start  md:px-20 mx-auto p-4 md:py-6">
        <div className="grid gap-3 items-start md:px-28">
          {product[0].images == undefined && (
            <ProductImages
              images={[
                "https://dev.zamaro.ae/wp-content/uploads/woocommerce-placeholder.png",
              ]}
            />
          )}
          {(product[0].images || []).length > 0 && (
            <ProductImages images={product[0].images} />
          )}
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className=" items-start">
            <div className="text-4xl font-bold my-8">
              LKR {product[0].price}
              <span className="line-through text-gray-500 ml-8">
                {product[0].regular_price}
              </span>
            </div>
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl">
                {product[0].name}
              </h1>
              <div>
                <p>
                  {product[0].categories
                    .map((category) => category.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="color">
                Color
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="black"
                id="color"
              >
                {colorOptions.map((color) => (
                  <Label
                    key={color.id}
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor={color.id}
                  >
                    <RadioGroupItem id={color.id} value={color.value} />
                    {color.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="size">
                Size
              </Label>
              <RadioGroup
                className="flex items-center gap-2"
                defaultValue="m"
                id="size"
              >
                {sizeOptions.map((size) => (
                  <Label
                    key={size.id}
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor={size.id}
                  >
                    <RadioGroupItem id={size.id} value={size.value} />
                    {size.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <AddToCartButton product={addtocartbutton} />
              <Button size="lg" variant="outline">
                Add to wishlist
              </Button>
            </div>
          </form>
          <Separator />
          <div className="grid gap-4 text-sm leading-loose">
            <div
              dangerouslySetInnerHTML={{ __html: product[0].description }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;

export async function generateStaticVParams() {
  const url = `${process.env.NEXT_PUBLIC_WP_REST}/products/?consumer_key=${process.env.NEXT_PUBLIC_WOO_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOO_SECRET}`;
  const posts = await fetch(url).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
