const EachPost = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-2">
        <div className="font-semibold">S</div>
        <div className="font-normal">Shorupan P</div>
        <div className="flex items-center justify-center">.</div>
        <div className="text-gray-600">Dec 2, 2024</div>
      </div>
      <div>
        <div className="text-3xl font-bold">
          How an Ugly single page website makes $5,000 a month with affiliate
          marketing
        </div>
        <div className="mt-4 text-lg leading-7 text-gray-600">
          No need to create a Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Facilis, fugit corrupti molestias assumenda et dicta atque eaque
          quasi tempore doloremque nisi id, odio veritatis vero rem! Rerum
          officia vero repellendus.
        </div>
      </div>
      <div className="text-gray-600 text-bse">5 min read</div>
    </div>
  );
};

export default EachPost;
