# Sacred Scrubs — website

A plain HTML/CSS/JS site, built to run entirely on GitHub Pages (no backend, no build step).

## 1. Publishing it on GitHub Pages

1. Create a new GitHub repository and upload everything in this folder to it (keep the folder structure as-is).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save — GitHub will give you a `*.github.io` URL within a minute or two.

## 2. Connecting the custom domain (sacredscrubs.co.za)

1. At your domain registrar, add these DNS records for the domain:
   - Four **A** records for the root domain (`sacredscrubs.co.za`) pointing to GitHub's IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A **CNAME** record for `www` pointing to `<your-github-username>.github.io`
2. This repo already includes a `CNAME` file containing `sacredscrubs.co.za` — GitHub Pages uses this to know which domain to serve.
3. Back in **Settings → Pages**, enter `sacredscrubs.co.za` under "Custom domain" and save. DNS changes can take a few hours to fully propagate.
4. Tick "Enforce HTTPS" once it becomes available (usually shortly after DNS propagates).

## 3. Updating stock levels or prices

Open `data/products.json` directly on GitHub.com (click the file, then the pencil/edit icon).

Each product looks like this:

```json
{
  "id": "hand-scrub",
  "name": "Hand Scrub",
  "description": "...",
  "image": "images/hand-scrub.svg",
  "price": 150,
  "size": "250ml",
  "hasFragrance": true,
  "hasApplication": false,
  "stock": 14
}
```

- Change `"stock"` to update how many are left. Set it to `0` and the site automatically shows "Out of stock" and disables the Add to Cart button.
- Change `"price"` or `"size"` to update pricing or size.
- `"hasFragrance"` controls whether the fragrance picker shows up on that product's page (off for the lotion). `"hasApplication"` is a leftover hook for a hand-or-foot picker — not used by any current product, since hands and feet are now separate products (Hand Scrub / Foot Scrub) rather than a toggle.
- Commit the change directly on the `main` branch — the live site updates within a minute or two.

## 4. Swapping in real product photos

1. Take/receive the real photos and export them as `.jpg` or `.png`.
2. In the `images/` folder on GitHub, upload the new photo (Add file → Upload files).
3. In `data/products.json`, change that product's `"image"` value to the new filename, e.g. `"images/sugar.jpg"`.
4. You can then delete the old placeholder `.svg` if you like — it's just a stand-in graphic.

## 5. Changing fragrances

Open `data/config.json`:

```json
{
  "fragrances": ["Lemon", "Rosemary", "Sweet Orange", "Peppermint"],
  "applications": ["Hand", "Foot"]
}
```

Add, remove, or rename any fragrance and every product with `"hasFragrance": true` updates automatically — no other file needs to change. Each product's size lives directly on that product in `products.json` instead, since sizes aren't shared across products.

## 6. Formspree (order + review submissions)

Both forms already point to their Formspree endpoints in `data/config.json`:

```json
"formEndpoints": {
  "orders": "https://formspree.io/f/xzezpenw",
  "reviews": "https://formspree.io/f/xjykbyno"
}
```

- **Orders** currently deliver to the placeholder recipient set up in Formspree. Once the client confirms her business/personal email, log into Formspree, open the "Orders" form, and change the recipient email in its settings — no website code needs to change.
- **Reviews** deliver to your own inbox for moderation. When you want to publish one, add it to `data/reviews.json`:

```json
{
  "name": "Customer name",
  "rating": 5,
  "text": "Their review text."
}
```

## 7. Site structure

```
index.html        Home page
catalogue.html     Product grid
product.html       Product detail (flavour/size/hand-or-foot + add to cart)
cart.html          Cart review page
order.html         Checkout / order form (submits to Formspree)
thankyou.html      Shown after an order or review is submitted
reviews.html       Testimonials + leave-a-review form
data/products.json Product catalogue + stock
data/config.json   Flavours, sizes, applications, Formspree endpoints
data/reviews.json  Published testimonials
css/style.css      All styling
js/cart.js         Cart storage (browser localStorage)
js/main.js         Shared page behaviour
images/            Product photos (currently placeholders)
CNAME              Custom domain for GitHub Pages
```
