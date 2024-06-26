-- CreateTable
CREATE TABLE "Cart" (
    "id" SMALLSERIAL NOT NULL,
    "id_user" SMALLINT NOT NULL,
    "cart_quantity" SMALLINT NOT NULL,
    "cart_price" SMALLINT NOT NULL,
    "quantity_prod" SMALLINT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SMALLSERIAL NOT NULL,
    "product_name" VARCHAR NOT NULL,
    "product_image" TEXT,
    "product_description" TEXT NOT NULL,
    "product_price" REAL NOT NULL,
    "is_sale" BOOLEAN NOT NULL DEFAULT false,
    "sale_percent" TEXT,
    "product_categoryid" SMALLINT NOT NULL,
    "product_subcategory_id" SMALLINT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sub_category" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "id_prod_cart" (
    "id" SMALLSERIAL NOT NULL,
    "id_prod" SMALLINT NOT NULL,
    "id_cart" SMALLINT NOT NULL,

    CONSTRAINT "id_prod_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "id_sub_cat" (
    "id" SMALLSERIAL NOT NULL,
    "id_cat" SMALLINT NOT NULL,
    "id_sub_cat" SMALLINT NOT NULL,

    CONSTRAINT "id_sub_cat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "public_Cart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Utilisateur"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "public_Product_product_categoryid_fkey" FOREIGN KEY ("product_categoryid") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "public_Product_product_subcategory_id_fkey" FOREIGN KEY ("product_subcategory_id") REFERENCES "Sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "id_prod_cart" ADD CONSTRAINT "public_id_prod_cart_id_cart_fkey" FOREIGN KEY ("id_cart") REFERENCES "Cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "id_prod_cart" ADD CONSTRAINT "public_id_prod_cart_id_prod_fkey" FOREIGN KEY ("id_prod") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "id_sub_cat" ADD CONSTRAINT "public_id_sub_cat_id_cat_fkey" FOREIGN KEY ("id_cat") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "id_sub_cat" ADD CONSTRAINT "public_id_sub_cat_id_sub_cat_fkey" FOREIGN KEY ("id_sub_cat") REFERENCES "Sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

