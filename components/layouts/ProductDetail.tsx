"use client";

import useSingleProduct from "@/hooks/queries/useSingleProduct";
import { formatPrice } from "@/lib/format";
import { calculateDiscountedPrice } from "@/lib/helper";
import { Product, TImage } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  HandCoins,
  Heart,
  Layers3,
  LockKeyhole,
  Share2,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import CountdownTimer from "./CountdownTimer";
import AddToCart from "./AddToCart";
import { Button } from "../ui/button";
import Link from "next/link";
import { Rating } from "@mui/material";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TiStarFullOutline } from "react-icons/ti";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { reviewFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

interface Props {
  productId: string;
}
const ProductDetail: React.FC<Props> = ({ productId }) => {
  const { product } = useSingleProduct(productId);

  if (!product) {
    return null;
  }

  const discountPrice = formatPrice(
    calculateDiscountedPrice(product.price, product.discountPrice)
  );
  const originalPrice = formatPrice(product.price);
  const difference =
    new Date(product.discountEndDate).getTime() - new Date().getTime();

  return (
    <div>
      {/* Upper Div */}
      <div className="flex gap-14 lg:flex-row flex-col">
        {/* Images Container */}
        <ProductDetailGallery images={product.images} />

        {/* Product Detail Container */}
        <div className="flex-1 relative">
          <button className="absolute right-4 border p-2 px-3 rounded-lg text-gray-600 hover:text-primary">
            <Copy size={20} className="" />
          </button>
          <div className="flex items-center">
            <Rating
              defaultValue={product.rating.average}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="ms-3 opacity-70">
              {product.rating.average} Review(s)
            </span>
          </div>
          <h1 className="text-3xl font-semibold mt-2">{product.name}</h1>

          {product.discountApplied && (
            <p className="mt-4 text-primary ">
              {originalPrice} - {product.discountPrice}% Off
            </p>
          )}
          <p
            className={`${
              product.discountApplied ? "mt-1" : "my-4"
            } text-2xl font-medium`}
          >
            {discountPrice}
          </p>
          {difference > 0 && (
            <div className="my-4 mb-6 space-y-2">
              <h4 className="text-xl font-medium">Time Left</h4>
              <CountdownTimer dateEnd={product.discountEndDate} />
            </div>
          )}

          <p>
            <strong>Available In Stock</strong>:{" "}
            <span className="text-primary font-medium">117 Items</span>
          </p>

          <div className="my-4 w-max">
            <div className="my-4 flex items-center gap-4">
              <AddToCart
                quantity={1}
                increment={() => {}}
                decrement={() => {}}
              />
              <Button className="space-x-2 h-12" size={"lg"}>
                <ShoppingBag />
                <span className="font-medium"> Add To Cart</span>
              </Button>
              <Button variant="outline" className="h-12">
                <Heart size={20} />
              </Button>
            </div>
            <button className="w-full h-12 font-semibold border border-black rounded-lg hover:bg-primary hover:border-0 hover:text-white transition duration-300">
              Buy it now
            </button>

            <div className="w-full my-4 flex items-center justify-between">
              <button className="flex items-center gap-2 opacity-90 hover:opacity-100 transition">
                <Layers3 />
                <span className="text-lg">Comapre</span>
              </button>
              <button className="flex items-center gap-2 opacity-90 hover:opacity-100 transition">
                <Copy />
                <span className="text-lg">Copy</span>
              </button>
              <button className="flex items-center gap-2 opacity-90 hover:opacity-100 transition">
                <Share2 />
                <span className="text-lg">Share</span>
              </button>
            </div>

            <div className="w-full my-8 space-y-4">
              <div className="flex items-center justify-start h-14 px-4 gap-2 rounded-lg bg-primary/10">
                <LockKeyhole className="text-gray-800" />
                <Link href="#" className="font-medium">
                  Security Policy
                </Link>
              </div>
              <div className="flex items-center justify-start h-14 px-4 gap-2 rounded-lg bg-primary/10">
                <Truck className="text-gray-800" />
                <Link href="#" className="font-medium">
                  Delivery Policy
                </Link>
              </div>
              <div className="flex items-center justify-start h-14 px-4 gap-2 rounded-lg bg-primary/10">
                <HandCoins className="text-gray-800" />
                <Link href="#" className="font-medium">
                  Return Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Container */}
      <ProductDetailTab product={product} />

      {/* Featured products Container */}
    </div>
  );
};

export default ProductDetail;

const ProductDetailGallery = ({ images }: { images: TImage[] }) => {
  const [activeImageSlide, setActiveImageSlide] = useState(0);
  const imageSliderRef = useRef<Slider>(null);
  const gallerySliderRef = useRef<Slider>(null);

  const prevSlide = () => {
    imageSliderRef.current?.slickPrev();
    gallerySliderRef.current?.slickPrev();
  };

  const nextSlide = () => {
    imageSliderRef.current?.slickNext();
    gallerySliderRef.current?.slickNext();
  };

  const changeActiveImageSlide = (index: number) => {
    setActiveImageSlide(index);
  };

  const imageSliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnFocus: true,
    initialSlide: 0,
    waitForAnimate: false,
    beforeChange: (current: number, next: number) => {
      changeActiveImageSlide(next);
    },
  };

  const imageGallerySliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 468, // Adjust this breakpoint based on your design
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller screens
        },
      },
    ],
  };

  const activeImage = images[activeImageSlide];

  return (
    <div className="sm:w-[500px] w-full mx-auto h-max">
      {/* Image Slider */}
      <div className="w-full h-[400px] rounded-lg relative group overflow-hidden">
        <Slider
          ref={imageSliderRef}
          {...imageSliderSettings}
          className="w-full h-full"
        >
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.url}
              alt={image.id}
              width={800}
              height={800}
              className="w-full h-full rounded-lg object-contain"
            />
          ))}
        </Slider>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 rounded-full text-sm flex items-center justify-center border text-black bg-white shadow"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center border text-black bg-white shadow"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="w-full mt-2">
        <Slider
          ref={gallerySliderRef}
          {...imageGallerySliderSettings}
          className="w-full h-full"
        >
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.url}
              alt={image.id}
              width={400}
              height={400}
              className={`w-full h-full rounded-lg  object-contain ${
                activeImage.id === image.id ? "border border-primary" : ""
              }`}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

const ProductDetailTab = ({ product }: { product: Product }) => {
  const [star, setStar] = useState("All");
  const content = (block: any) => {
    const { type, data } = block as any;
    if (type === "paragraph") {
      return (
        <p
          dangerouslySetInnerHTML={{ __html: data?.text }}
          className="text-sm my-4"
        ></p>
      );
    } else if (type === "header") {
      const { text, level } = data;
      if (level === 2) {
        return (
          <h1
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-3xl font-semibold my-2"
          ></h1>
        );
      } else if (level === 2) {
        return (
          <h2
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-2xl font-semibold my-2"
          ></h2>
        );
      } else if (level === 3) {
        return (
          <h3
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-xl font-semibold my-2"
          ></h3>
        );
      } else if (level === 4) {
        return (
          <h4
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-lg font-semibold my-2"
          ></h4>
        );
      } else if (level === 5) {
        return (
          <h5
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-lg font-semibold my-2"
          ></h5>
        );
      } else if (level === 6) {
        return (
          <h6
            dangerouslySetInnerHTML={{ __html: text }}
            className="text-lg font-semibold my-2"
          ></h6>
        );
      }
    } else if (type === "image") {
      return (
        <div>
          <Image src={data.file.url} alt="product-description-image" />
          {data.caption.length && (
            <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">
              {data.caption}
            </p>
          )}
        </div>
      );
    } else if (type === "list") {
      return (
        <ol
          className={`pl-5 ${
            data.style === "ordered" ? "list-decimal" : "list-disc"
          }`}
        >
          {data.items.map((listItem: any, i: number) => (
            <li
              key={i}
              className="my-4"
              dangerouslySetInnerHTML={{ __html: listItem }}
            ></li>
          ))}
        </ol>
      );
    } else if (type === "quote") {
      return (
        <div className="bg-primary/10 p-3 pl-5 border-l-4 border-primary">
          <p className="text-xl leading-10 md:text-2xl">{data.text}</p>
          {data.caption.length && (
            <p className="w-full text-purple my-3  text-base ">
              {data.caption}
            </p>
          )}
        </div>
      );
    }
  };

  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      message: "",
      rating: 0,
    },
  });

  const handleStar = (value: string) => {
    setStar(value);
  };

  const onSubmit = (values: z.infer<typeof reviewFormSchema>) => {
    console.log(values);
  };
  

  return (
    <div className="my-8 w-full">
      <Tabs defaultValue="productDetailTab" className="w-full ">
        <TabsList className="border-b w-full bg-transparent flex items-center justify-start h-14">
          <TabsTrigger value="description" className="w-max h-full">
            Description
          </TabsTrigger>
          <TabsTrigger value="review" className="w-max">
            Review
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          {product.description.map((block) => content(block))}
        </TabsContent>
        <TabsContent value="review">
          <div className="my-4 flex md:flex-row flex-col gap-8">
            {/* Review Foem */}
            <div className="md:w-1/2 w-full">
              <div className="w-full flex gap-4">
                <div className="w-14 h-14 rounded-full border border-gray-400"></div>

                <div className="flex-1">
                  <Form {...form}>
                    <form action="" className="space-y-4">
                      <Textarea
                        {...form.register("message")}
                        placeholder="Write your review..."
                      />
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Rating
                              precision={0.5}
                                value={Number(field.value)}
                                onChange={(event, newValue) => {
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="button" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="md:w-1/2 w-full">
              <div className="flex items-center gap-2 mb-4">
                {["All", "1", "2", "3", "4", "5"].map((value, index) => (
                  <button
                    key={index}
                    onClick={() => handleStar(value)}
                    className={`flex items-center justify-center p-2 px-3 rounded-full ${
                      star === value ? "bg-primary text-white" : "border"
                    }`}
                  >
                    <TiStarFullOutline className="text-yellow-400" />
                    <span className="text-sm ml-1">{value}</span>
                  </button>
                ))}
              </div>

              <div className="w-full space-y-6 max-h-[450px] overflow-y-auto no-scrollbar">
                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-gray-400"></div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-1">
                      <h3 className="font-semibold">Alexa Wallers</h3>
                      <span className="text-gray-600 text-sm font-medium">
                        Today
                      </span>
                    </div>
                    <Rating
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <p className="text-gray-700 text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Illo, deleniti et dolores nemo ea pariatur! Praesentium
                      vel molestias quo consectetur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
