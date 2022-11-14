INSERT INTO "public"."products" ("title", "price", "imageurl", "developer", "publisher", "description", "supportkbm", "supportcontroller", "features")
VALUES ('Quake', '9.99', 'https://cdn.akamai.steamstatic.com/steam/apps/2310/header.jpg?t=1660240704', 'id Software, Nightdive Studios, MachineGames', 'Bethesda Softworks', 'Developed by the award-winning id Software, Quake® is the ground-breaking, original dark fantasy first-person shooter that inspires today''s retro-style FPS games. With Quake (Enhanced), experience the authentic, updated, and visually enhanced version of the original.', 'true', 'true', 'Singleplayer, Multiplayer, PVP'),

       ('PAYDAY 2', '9.99', 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg?t=1666767102', 'OVERKILL - a Starbreeze Studio.', 'Starbreeze Publishing AB', 'PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree.', 'true', 'true', 'Singleplayer, Multiplayer, Co-op'),

      ('Fallout 76', '39.99', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/header.jpg?t=1665581700', 'Bethesda Game Studios', 'Bethesda Softworks', 'Bethesda Game Studios welcome you to Fallout 76. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers emerge into post-nuclear America. Explore a vast wasteland in this open-world multiplayer addition to the Fallout story.', 'true', 'true', 'Multiplayer, Co-op, MMORPG'),

      ('Destiny 2', '59.99', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg?t=1661876523', 'Bungie', 'Bungie', 'Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.', 'true', 'true', 'Singleplayer, Multiplayer, Co-Op'),

      ('Cyberpunk 2077', '59.99', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1663663573', 'CD PROJEKT RED', 'CD PROJEKT RED', 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification.', 'true', 'true', 'Singleplayer, RPG, Story'),

      ('Squad', '59.99', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/header.jpg?t=1668019306', 'Offworld Industries', 'Offworld Industries', 'Squad is a tactical FPS that provides authentic combat experiences through teamwork, constant communication, and realistic gameplay. It bridges the gap between arcade shooter and military simulation with 100 player battles, combined arms combat, base building, and an integrated VoIP system.', 'true', 'true', 'Multiplayer, Action, MMO')

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
        ('3', 'https://cdn.akamai.steamstatic.com/steam/apps/1151340/ss_e2f9a101b3b30aa4d612941db662d2a50553fc29.600x338.jpg?t=1665581700'),

        ('4', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/ss_7fcc82f468fcf8278c7ffa95cebf949bfc6845fc.600x338.jpg?t=1661876523'),
        ('4', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/ss_a9642404e586be28f856e8f02d038828f691a5ba.600x338.jpg?t=1661876523'),
        ('4', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/ss_01fdd090ed1dd70112ce2c6d6fc208df0a008ac7.600x338.jpg?t=1661876523'),
        ('4', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/ss_324e79ed624f3abd7a2eea2d187d6f616be17102.600x338.jpg?t=1661876523'),
        ('4', 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/ss_a35aaa73e605c0738a53a74abbcb53768e8f39e1.600x338.jpg?t=1661876523'),

        ('5', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_9284d1c5b248726760233a933dbb83757d7d5d95.600x338.jpg?t=1663663573'),
        ('5', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_872822c5e50dc71f345416098d29fc3ae5cd26c1.600x338.jpg?t=1663663573'),
        ('5', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_f79fda81e6f3a37e0978054102102d71840f8b57.600x338.jpg?t=1663663573'),
        ('5', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_0002f18563d313bdd1d82c725d411408ebf762b0.600x338.jpg?t=1663663573'),
        ('5', 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/ss_526123764d1c628caa1eb62c596f1b732f416c8c.600x338.jpg?t=1663663573'),

        ('6', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/ss_bb13772a4c797d337cdd65e6404c826304b55ef8.600x338.jpg?t=1668019306'),
        ('6', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/ss_5c80e67f894d776aa528c3550c202ec0c3ee27c0.600x338.jpg?t=1668019306'),
        ('6', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/ss_6fabf783d6897ad15486b2051c997d9f9a8f2ab0.600x338.jpg?t=1668019306'),
        ('6', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/ss_1d5044e6029bda85c1ded182b203cbd4cd07c18b.600x338.jpg?t=1668019306'),
        ('6', 'https://cdn.akamai.steamstatic.com/steam/apps/393380/ss_4885dee832bde8197b7d3b1310dfbd1f7a01136d.600x338.jpg?t=1668019306')

;
-- VALUES ("title", "price", "imageUrl", "developer", "publisher", "description", "supportKBM", "supportController")
