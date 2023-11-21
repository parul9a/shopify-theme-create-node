require("dotenv").config();
const express = require("express");
const Shopify = require("shopify-node-api");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const shopify = new Shopify({
  shop: "cpim-sandbox-2", // replace with your shop name
  shopify_api_key: process.env.SHOPIFY_API_KEY,
  shopify_shared_secret: process.env.SHOPIFY_SECRET_KEY,
  shopify_scope: "read_products,write_products,read_themes,write_themes",
  redirect_uri: "http://localhost:8082/auth/callback",
  nonce: "", // you must provide a randomly selected value unique for each authorization request
});

app.get("/auth", (req, res) => {
  const authURL = shopify.buildAuthURL();
  res.redirect(authURL);
});

app.get("/auth/callback", (req, res) => {
  const { code } = req.query;
  shopify.exchange_temporary_token(req.query, (err, data) => {
    // data contains your access token
    res.send(data);
  });
});

app.get("/products", (req, res) => {
  const params = { limit: 5 };
  shopify.get("/admin/products.json", params, (err, data) => {
    res.send(data.products);
  });
});
app.post("/products/add", (req, res) => {
  var post_data = {
    product: {
      title: "Test 1000",
      body_html: "<strong>Good snowboard!</strong>",
      vendor: "Burton",
      product_type: "Snowboard",
      variants: [
        {
          option1: "First",
          price: "10.00",
          sku: 123,
        },
        {
          option1: "Second",
          price: "20.00",
          sku: "123",
        },
      ],
    },
  };

  shopify.post(
    "/admin/products.json",
    post_data,
    function (err, data, headers) {
      console.log(data);
      res.send("Product Created");
    }
  );
});
app.post("/addTheme", (req, res) => {
  let data = req.body;
  let theme_name = data.theme_name;
  let theme_url = data.theme_url;
  var params = {
    theme: {
      name: theme_name,
      src: theme_url,
      role: "main",
    },
  };
  console.log("param");
  console.log(params);

  shopify.post("/admin/themes.json", params, function (err, data) {
    console.log(data);
    res.send("Theme Created");
  });
});

app.get("/themes", (req, res) => {
  console.log(req.body);
  const params = { limit: 5 };
  shopify.get("/admin/themes.json", params, (err, data) => {
    res.send(data.themes);
    console.log("res", res);
    console.log("data", data);
    console.log("err", err);
  });
});
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/formPost", (req, res) => {
  console.log(req.body);
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.send(JSON.stringify(response));
});

app.listen(8082, () => console.log("Server is listening on port 8082"));
