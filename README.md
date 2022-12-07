To set up dependencies: `yarn`

To run: `yarn start`

Visit http://localhost:4000 and sumbit a sample query:

```gql
query {
  productGroups(slugs: ["cloudflow", "cloudflyer", "cloudventure"]) {
    displayName
  }
}
```
