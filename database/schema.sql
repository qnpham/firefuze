set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."cartitems" (
	"cartid" int NOT NULL UNIQUE,
	"productid" int NOT NULL,
	"quantity" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."carts" (
	"cartid" serial NOT NULL,
	CONSTRAINT "carts_pk" PRIMARY KEY ("cartid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."orders" (
	"orderid" serial NOT NULL,
	"cartId" int NOT NULL,
	"userEmail" TEXT NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("orderid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."products" (
	"productid" serial NOT NULL,
	"title" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"developer" TEXT NOT NULL,
	"publisher" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"supportKBM" BOOLEAN NOT NULL,
	"supportController" BOOLEAN NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("productid")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."screenshots" (
	"imageId" serial NOT NULL,
	"productId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
	CONSTRAINT "screenshots_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "cartitems" ADD CONSTRAINT "cartitems_fk0" FOREIGN KEY ("cartid") REFERENCES "carts"("cartid");
ALTER TABLE "cartitems" ADD CONSTRAINT "cartitems_fk1" FOREIGN KEY ("productid") REFERENCES "products"("productid");


ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cartId") REFERENCES "carts"("cartid");


ALTER TABLE "screenshots" ADD CONSTRAINT "screenshots_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productid");
