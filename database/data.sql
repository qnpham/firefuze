INSERT INTO "public"."products" ("title", "price", "imageurl", "developer", "publisher", "description", "supportkbm", "supportcontroller")
VALUES ('Quake', '9.99', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/header.jpg?t=1660240704', 'id Software, Nightdive Studios, MachineGames', 'Bethesda Softworks', 'Developed by the award-winning id Software, Quake® is the ground-breaking, original dark fantasy first-person shooter that inspires today''s retro-style FPS games. With Quake (Enhanced), experience the authentic, updated, and visually enhanced version of the original.', 'true', 'true'),

       ('PAYDAY 2', '9.99', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg?t=1666767102', 'OVERKILL - a Starbreeze Studio.', 'Starbreeze Publishing AB', 'PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.', 'true', 'true'),

      ('Fallout 76', '39.99', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/header.jpg?t=1665581700', 'Bethesda Game Studios', 'Bethesda Softworks', 'Bethesda Game Studios welcome you to Fallout 76. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers emerge into post-nuclear America. Explore a vast wasteland in this open-world multiplayer addition to the Fallout story.', 'true', 'true')

;


INSERT INTO "public"."screenshots" ("productid", "imageurl")
VALUES ('1', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/ss_b7d9bbc1036fe011e076eb70d57cfc6251863a4c.600x338.jpg?t=1660240704'),
        ('1', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/ss_537a59320f0fa4eafcefe94df2e8fee00277fdeb.600x338.jpg?t=1660240704'),
        ('1', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/ss_bfe906143a3ec377e5525affa45b1a2018e71c31.600x338.jpg?t=1660240704'),
        ('1','https://cdn.akamai.steamstatic.com/steam/apps/2310/ss_94541aa0f1106de0c4004d6151536e0c65c92a73.600x338.jpg?t=1660240704'),
        ('1', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/ss_e31f19558199f97dd40cdf8655e67e28018d849c.600x338.jpg?t=1660240704'),

        ('2', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/ss_a907ef769cf2b1c02075401e215b635f2cf247c2.600x338.jpg?t=1666767102'),
        ('2', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/ss_06c29d7b44621b69bcf7107fd4b18de39e4b8212.600x338.jpg?t=1666767102'),
        ('2', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/ss_79037e616835b71e89200475a3ad362ae5f48923.600x338.jpg?t=1666767102'),
        ('2', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/ss_69ccf0a4ff55ba90a077b459ee20bde5abca177c.600x338.jpg?t=1666767102'),
        ('2', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/ss_129b54f5814834c18a5ef0b9fde4cdd44e8fd312.600x338.jpg?t=1666767102'),

        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_d48b4bd58c60de3419a304142e97d0578d96ec3e.600x338.jpg?t=1665581700'),
        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_7b24767d5dfc0793ba5faaa35633c038241058fd.600x338.jpg?t=1665581700'),
        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_45374c8b13e9aa755f6cf9565364e2b6ca83f592.600x338.jpg?t=1665581700'),
        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_cb553adb59b6f77e3530eef68185f1ee1e70ad3e.600x338.jpg?t=1665581700'),
        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_e2f9a101b3b30aa4d612941db662d2a50553fc29.600x338.jpg?t=1665581700')

;
-- VALUES ("title", "price", "imageUrl", "developer", "publisher", "description", "supportKBM", "supportController")
