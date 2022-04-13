# Pokedex!!

A simple responsive Pokedex built with Next.js | Emotion.sh | GraphQL for Tokopedia coding test.

## Design
The design inspired by [Pau Esparó](https://www.artstation.com/artwork/v25GNv) to take the Pokedex design into a modern approach but still get the vibe of the old school Pokedex.
This design will make you feel like you are holding a Pokedex like your childhood dream :).

### Design Explanation
![image](https://user-images.githubusercontent.com/58857692/163098700-719f46db-7573-4184-96fe-ad91064d7aeb.png)<br />
The button under the screen is for navigating between Pokemon List (Pokemons button) and My Pokemon List (Backpack Button)

![image](https://user-images.githubusercontent.com/58857692/163098381-0a825812-9614-4a1e-aab1-697847007800.png)<br />
The Pokeball flat image on the right indicates that it is owned or not.
The displayed number indicates [the Id of the pokemon] / [Total Pokemon owned]

![image](https://user-images.githubusercontent.com/58857692/163098888-2f19a67b-61d9-40f3-9365-545c982b981e.png)<br />
On the pokemon detail page, you can catch the current pokemon that you select on the Pokemon List. It's a 50% chance of getting the pokemon, but it's okay you will have unlimited Pokeball for now :) (Might change later).

![image](https://user-images.githubusercontent.com/58857692/163099120-ef4c3835-9c97-464a-abf1-0eb71ffbf992.png)<br />
This pokedex doesn't have a fighting feature yet so they can't hurt you don't worry, but be careful they might hurt your feelings :(.

![image](https://user-images.githubusercontent.com/58857692/163099514-f14c1497-9ef1-4bad-86fb-bac131fe6460.png)<br />
If you are lucky to catch the pokemon, you can see all the pokemons that you owned in My Pokemon List Page. *p.s there is a bug that you can't delete the first Pokemon, I was using the splice method wrong it should be splice(index,1) not splice(index, index). Buttt this bug will make sure that you don't accidentally release your first pokemon tho :)

## Technical Side

All of the Pokedex outer layouts are on _app.js and there are the styled-components on that file too. This might not be the best approach because I think it will be better if the styles are separated.

For saving the pokemon, I'm using local storage to store the data. 
The structure is like this 
`{
  "pokemon": [
    {
      "id": 1,
      "nickname": "bulbasaur",
      "name": "bulbasaur",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      "imageBack": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
    }
  ]
}`
The "downside" is that you can modify the data on your own in the dev tool. 

I'm using graphql to get the list of Pokemons and pokemon details, you can see in pages/index.js. This is might not be the best approach for modular programming because the code should be in another file.

I think that's all that I need to mention, it was a fun project to learn more about next.js, graphql, and emotion.sh. I hope you are enjoying the app as much as I do :).


Credits: <br />
Pokemon GraphQL - https://github.com/mazipan/graphql-pokeapi by Irfan Maulana <br />
Pokeball - https://www.kindpng.com/imgv/JTRwwh_pokeball-pixel-png-png-download-pokeball-pixel-art/ by Joonwon Yoon <br />
Design Inspiration - https://www.artstation.com/artwork/v25GNv by Pau Esparó <br />
Project idea - Tokopedia recruiter <br />



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
