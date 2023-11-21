# shopify-theme-create-node
Create Shopify theme through Node js
Shopify Theme Creation: Custom Node Js App 

1. Install Node js 
Mainly used to develop server-side and networking applications, Node.js is an open-source, cross-platform runtime environment that needs to be installed in prior. 
To check the node version run below command  
Command : node -v (To get the node js version) 
 
Install the dependencies: dotenv, body-parser, mysql, shopify-api-node, crypto, nonce from npm package. 
Run this command: npm install express dotenv shopify-node-api 
Create a project folder and index.js file 
Command : npm install 

Registering Shopify App: 
Before we can interact with Shopify's API, we need to register a new app in the Shopify Partners dashboard: 
Log in to your Shopify Partners account. If you don't have one, you can create it for free on the Shopify Partners website. 
Once logged in, navigate to "Apps" -> "Create app". 
Fill in the app name and app URL (for development, this can be http://localhost:8081, or another port of your choosing). 
Make note of the API key and API secret key that are generated. We'll need them later. 
Now include the redirect Url in the Shopify partners account > App> App setup > Urls 

Now run the http://localhost:8081/auth 
Install the app by clicking “Install app” button. You are now connected with shopify. Now you can add/list theme. 
 
Create theme: 
A new theme is always unpublished by default. To publish a theme when you create it, include "role": "main" in the POST request. The theme will be published only after all of its files have been extracted and stored by Shopify, which might take a couple of minutes. 

Create index.js file inside node project. 
/auth function will check the authentication with shopify store with the help of shopify-node-api library. Here we need to pass few parameters. 
1. Shop name 
2. Shopify app api key 
3. Shopify app secret key 
4. shopify scope: [In our case:read_products, write_products, read_themes, write_themes] 
5. redirect uri: localhost url[http://localhost:8082/auth/callback] 

Inorder to create theme, we need to create a form:  
We need to first create a form where a user will select the Theme name and Theme url [Shopify Theme Zip file]. 
Inside the form function: we need to pass the html path.   
app.get("/form", (req, res) => { 
  res.sendFile(__dirname + "/public/index.html"); 
}); 
 

Create index.html file 
Create 2 input fields with Theme name and Theme Url and give the form action with url: http://localhost:8082/addTheme. On submitting the form, it will redirect to addTheme Function. 
 
Inside addTheme Function:  
Fetch Request body data and store them in local variables such as theme name and theme url and then pass them under parameters and then call shopify post method to create theme.  
 
Working 
Now open terminal / command promt and run the command node index.js 
Open http://localhost:8082/form 
Fill the details and then click submit button. You will be able to create theme in shopify store. 
 
 
 
 
