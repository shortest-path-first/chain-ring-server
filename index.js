const express = require('express');
const db = require('./db/db');
const axios = require('axios');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.json())

const info = {
  "html_attributions": [],
  "results": [
    {
      "geometry": {
        "location": {
          "lat": 30.0056609,
          "lng": -90.03834119999999
        },
        "viewport": {
          "northeast": {
            "lat": 30.00689422989273,
            "lng": -90.03706592010728
          },
          "southwest": {
            "lat": 30.00419457010728,
            "lng": -90.03976557989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "e4135c16f015e6fc15bd2e3751eea888f05f733a",
      "name": "Walmart Supercenter",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 4160,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/110066675577840172079/photos\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAZxwM-PIzUDoyG3q3cmlzoM9rLC0BBEZ7Y-OTIkp8HCcP_SYLnKvip1f7GQwGRLlOdnGF-0bdEpRzyMIAjj22enrP6SsJ1BysOfr1rpA023vuhjNxcoFtSzevCHY60EIYEhC8i9BgFxdryVdOQEh_R8sRGhR6x4s-R_R3N2-EdBbsdVHAWtu-Dg",
          "width": 3120
        }
      ],
      "place_id": "ChIJrRNSLfaoIIYRYZ2FOy5daBk",
      "plus_code": {
        "compound_code": "2X46+7M New Orleans, Louisiana",
        "global_code": "862F2X46+7M"
      },
      "price_level": 1,
      "rating": 3.6,
      "reference": "ChIJrRNSLfaoIIYRYZ2FOy5daBk",
      "scope": "GOOGLE",
      "types": [
        "department_store",
        "supermarket",
        "grocery_or_supermarket",
        "electronics_store",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 2320,
      "vicinity": "4301 Chef Menteur Hwy, New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.9588913,
          "lng": -89.98418789999999
        },
        "viewport": {
          "northeast": {
            "lat": 29.95999002989272,
            "lng": -89.98303857010728
          },
          "southwest": {
            "lat": 29.95729037010728,
            "lng": -89.98573822989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "a73261599f3281b223f1c853a64eb9f7aa5d1264",
      "name": "Walmart Supercenter",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 5312,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/114359732633213044039/photos\">Allison Gerhold</a>"
          ],
          "photo_reference": "CmRaAAAANZQKrnO3QuQ4S4MfiWnFWkgRdWpzYD0CeVdBULAF_9ewqeRRIwizF3Mqc52-wABDVjnSJwmPlGGZimFhk3IdRTRK0YHkKW48tN4liq8BpxnN3DJ5suGbWags--aNFakKEhAqcQSNMVQ7io1CNvgbcc-EGhT9NtpRN0JxQ8ew4dCndIG6E57sgg",
          "width": 2988
        }
      ],
      "place_id": "ChIJuWtS3kAdnogRcoG5iftGenc",
      "plus_code": {
        "compound_code": "X258+H8 Chalmette, Louisiana",
        "global_code": "76XGX258+H8"
      },
      "price_level": 1,
      "rating": 3.8,
      "reference": "ChIJuWtS3kAdnogRcoG5iftGenc",
      "scope": "GOOGLE",
      "types": [
        "department_store",
        "supermarket",
        "grocery_or_supermarket",
        "electronics_store",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1810,
      "vicinity": "8101 W Judge Perez Dr, Chalmette"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.0433238,
          "lng": -89.96194
        },
        "viewport": {
          "northeast": {
            "lat": 30.04494057989272,
            "lng": -89.96017327010728
          },
          "southwest": {
            "lat": 30.04224092010728,
            "lng": -89.96287292989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "be4fb1393f40a3334d0b3d1afe60985b581f3f27",
      "name": "Walmart Supercenter",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1080,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112813421106505885508/photos\">MISAEL GAVIA</a>"
          ],
          "photo_reference": "CmRaAAAAxYM_4QomMQQdjYliP_B4ohNXc7pgebmogozjwKpbtH3C3qfQJ-jldWDO0xuYM7OgNW8_b-FoelwaLIa5UopiRwV28Qz4xuVx8RrWqna1MMjtsHWHk5yhoKZwKb1M8DE_EhB1py2TOTC85xUvjzP0Xg6AGhQ5eXX31Rb3Qaes_RxuZALKHXx7VA",
          "width": 1920
        }
      ],
      "place_id": "ChIJI92MCsoDnogR73Jhi0WZVUo",
      "plus_code": {
        "compound_code": "22VQ+86 New Orleans, Louisiana",
        "global_code": "862G22VQ+86"
      },
      "price_level": 1,
      "rating": 3.9,
      "reference": "ChIJI92MCsoDnogR73Jhi0WZVUo",
      "scope": "GOOGLE",
      "types": [
        "department_store",
        "supermarket",
        "grocery_or_supermarket",
        "electronics_store",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1718,
      "vicinity": "6000 Bullard Ave, New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.005673,
          "lng": -90.03805899999999
        },
        "viewport": {
          "northeast": {
            "lat": 30.00693837989272,
            "lng": -90.03694312010727
          },
          "southwest": {
            "lat": 30.00423872010727,
            "lng": -90.03964277989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "ef811f878d130d50c7a37e737788c4bf76477861",
      "name": "Walmart Connection Center",
      "opening_hours": {},
      "place_id": "ChIJVwABM_aoIIYRU3Cnew65qSA",
      "plus_code": {
        "compound_code": "2X46+7Q New Orleans, Louisiana",
        "global_code": "862F2X46+7Q"
      },
      "price_level": 1,
      "rating": 3.2,
      "reference": "ChIJVwABM_aoIIYRU3Cnew65qSA",
      "scope": "GOOGLE",
      "types": [
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 5,
      "vicinity": "New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.9344809,
          "lng": -89.9238951
        },
        "viewport": {
          "northeast": {
            "lat": 29.93585242989272,
            "lng": -89.92257932010727
          },
          "southwest": {
            "lat": 29.93315277010728,
            "lng": -89.92527897989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "49b2901f71c91d3e82f0ed39070816dad7eb6851",
      "name": "Walmart Neighborhood Market",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1920,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/111209808463626605999/photos\">Tyronne Gabriel</a>"
          ],
          "photo_reference": "CmRaAAAALrlL1uxHlN4mJrUHeV5iRKOTOYZiWlJSqxeGcsjOnj0jvG3zTMy3ICxTndZugn4qHc61lQvT7-qv5AwmVGuiU5I4lD4NpEsuPELaH-0R0iPk2p6UiB0VeMDRLH6eu6FsEhDOLHsMqlOUiNrjQwf9mYHsGhT8UIVVkHcuxbSI7IGMnwVFRRyJrw",
          "width": 1080
        }
      ],
      "place_id": "ChIJD2bG0X0bnogRztWBhjao-YU",
      "plus_code": {
        "compound_code": "W3MG+QC Meraux, D, LA",
        "global_code": "76XGW3MG+QC"
      },
      "price_level": 1,
      "rating": 4.3,
      "reference": "ChIJD2bG0X0bnogRztWBhjao-YU",
      "scope": "GOOGLE",
      "types": [
        "supermarket",
        "department_store",
        "grocery_or_supermarket",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 440,
      "vicinity": "2500 Archbishop Philip M Hannan Blvd, Meraux"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.9589736,
          "lng": -89.984099
        },
        "viewport": {
          "northeast": {
            "lat": 29.96008657989272,
            "lng": -89.98287112010728
          },
          "southwest": {
            "lat": 29.95738692010728,
            "lng": -89.98557077989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "dd6def837f4ec3127d15b027e854426e436f34da",
      "name": "Walmart Pharmacy",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1200,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116004669783525361869/photos\">Walmart Pharmacy (inside Walmart)</a>"
          ],
          "photo_reference": "CmRaAAAAQEhkklcz5mud8gyJkZwICI0JAEKpNO-YS5xi4DmxB85wqoU4kcJJTEQ1XUJ6ovqWOyq72srRmhaZ4S5HvgSE4ahIwhdoXQGkGK-R1eK5stndkxhTn8m_8OyaTiWG_FTKEhBN3aYCaR_sLNJMrc3oZ_n3GhQhBG2pqcJzi8euHvxwnFaTFxSD9g",
          "width": 1600
        }
      ],
      "place_id": "ChIJ4TGwbO2nIIYRw4Sf3-y1xr0",
      "plus_code": {
        "compound_code": "X258+H9 Chalmette, Louisiana",
        "global_code": "76XGX258+H9"
      },
      "price_level": 1,
      "rating": 2.9,
      "reference": "ChIJ4TGwbO2nIIYRw4Sf3-y1xr0",
      "scope": "GOOGLE",
      "types": [
        "pharmacy",
        "department_store",
        "health",
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 7,
      "vicinity": "8101 W Judge Perez Dr, Chalmette"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.0433127,
          "lng": -89.9616413
        },
        "viewport": {
          "northeast": {
            "lat": 30.04472462989272,
            "lng": -89.96034637010727
          },
          "southwest": {
            "lat": 30.04202497010728,
            "lng": -89.96304602989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "26bfd9afa1b61ebdecec0a6e12c2689f77264259",
      "name": "Walmart Pharmacy",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1200,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112938879348055412221/photos\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAIxXQVxOKuERI8tlbGciJql-qY8Pn2q7GZoOsL2Zdt_ZSXpfbS8HmFXrQoe7WWX5iwbpleFG_jCqxibIWNgLE9qccJCkg-U2WU7vdM6IHatOqVPNhsmSqVEmV31frQESPEhB3k6XF1o_N1AlaQyaFpY9_GhSbAIuomueLD6h0ZJUqLRChLl13_w",
          "width": 1600
        }
      ],
      "place_id": "ChIJT5Dzp8oDnogRH4JyYFQ80pw",
      "plus_code": {
        "compound_code": "22VQ+88 New Orleans, Louisiana",
        "global_code": "862G22VQ+88"
      },
      "price_level": 1,
      "rating": 4.3,
      "reference": "ChIJT5Dzp8oDnogRH4JyYFQ80pw",
      "scope": "GOOGLE",
      "types": [
        "pharmacy",
        "department_store",
        "health",
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 3,
      "vicinity": "6000 Bullard Ave, New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.0054753,
          "lng": -90.0383427
        },
        "viewport": {
          "northeast": {
            "lat": 30.00679892989272,
            "lng": -90.03706547010728
          },
          "southwest": {
            "lat": 30.00409927010728,
            "lng": -90.03976512989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "24900038041f911ad64562ff5fa4a24e0dcd36e2",
      "name": "Walmart Bakery",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 608,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/110949234358644831260/photos\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAoK9Y0mqmjXP51oExCpOXibGz-rbZ6Aa9CPA4WkCmVLnyIt0G1veHhoPnIMBrOvXMUCiux1_ilwsRtnriBJs0hk2bChqriQ4GaDLQuzoQcffQOXqu9uBQMrPRqdOuy3r3EhAdoxF79li2o3khP5Tw1HZWGhTUOOy8wcwn3k25QDOObKsw_UZACw",
          "width": 1080
        }
      ],
      "place_id": "ChIJC8zDS_aoIIYR11LIxhVSebo",
      "plus_code": {
        "compound_code": "2X46+5M New Orleans, Louisiana",
        "global_code": "862F2X46+5M"
      },
      "price_level": 1,
      "rating": 4,
      "reference": "ChIJC8zDS_aoIIYR11LIxhVSebo",
      "scope": "GOOGLE",
      "types": [
        "bakery",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 4,
      "vicinity": "4301 Chef Menteur Hwy, New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.934312,
          "lng": -89.92430619999999
        },
        "viewport": {
          "northeast": {
            "lat": 29.93575047989272,
            "lng": -89.92287467010726
          },
          "southwest": {
            "lat": 29.93305082010727,
            "lng": -89.92557432989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "bae2843aa0fb60c88f99ad4fa7cd5da70eb764a0",
      "name": "Walmart Pharmacy",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1200,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/108910414135401290457/photos\">Walmart Pharmacy (inside Walmart)</a>"
          ],
          "photo_reference": "CmRaAAAAZIVYd7j6SZIVWXVYpJaOXVRC3ltox6hx-qcFwfPKYeZCT2UnAhKthUhaVUP1uIgVC_q-sTOf2d9JLnIDnYA3Xsk6s5gDeI3avQngO3Al-mHmreb7HD4Pn08WGG2RRx3BEhCVQ_7xq9_WBp2h_uEox9zJGhSjmxbeluZ0YD3h--Kf2BvWtesy0w",
          "width": 1600
        }
      ],
      "place_id": "ChIJHSLP0X0bnogRke9kkP-y3WI",
      "plus_code": {
        "compound_code": "W3MG+P7 Meraux, D, LA",
        "global_code": "76XGW3MG+P7"
      },
      "price_level": 1,
      "rating": 0,
      "reference": "ChIJHSLP0X0bnogRke9kkP-y3WI",
      "scope": "GOOGLE",
      "types": [
        "pharmacy",
        "department_store",
        "health",
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 0,
      "vicinity": "2500 Archbishop Hannan Blvd, Meraux"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.95926,
          "lng": -89.98398390000001
        },
        "viewport": {
          "northeast": {
            "lat": 29.96079657989273,
            "lng": -89.98253342010727
          },
          "southwest": {
            "lat": 29.95809692010728,
            "lng": -89.98523307989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "d5cbc6fceb4a2195edc52e03bd30a64cacd7614d",
      "name": "Walmart Vision & Glasses",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 608,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/109097827355115857691/photos\">Walmart Vision Center (inside Walmart)</a>"
          ],
          "photo_reference": "CmRaAAAA3osBA01FxPuj6hwhtx0VqrnM9d7-R5VL8QdrWp3MtyY0wPJ-R8AJ_LBMDaB8-nLVXiPEDeJ1Q8lJt9scSYWDxI9Su6IOOizLot4uWUMCs88eWeCKFC4MuHXxl9RvaDtvEhDjiq8p7RakKvhDRxvOTNTiGhSueoKNpkHhKSejiQDp-Kmbzpt5yg",
          "width": 1080
        }
      ],
      "place_id": "ChIJs10p-0YdnogRXPHd_kn8UIE",
      "plus_code": {
        "compound_code": "X258+PC Chalmette, Louisiana",
        "global_code": "76XGX258+PC"
      },
      "price_level": 1,
      "rating": 3.3,
      "reference": "ChIJs10p-0YdnogRXPHd_kn8UIE",
      "scope": "GOOGLE",
      "types": [
        "health",
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 9,
      "vicinity": "8101 W Judge Perez Dr, Chalmette"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.0432581,
          "lng": -89.9617198
        },
        "viewport": {
          "northeast": {
            "lat": 30.04467082989272,
            "lng": -89.96042557010728
          },
          "southwest": {
            "lat": 30.04197117010727,
            "lng": -89.96312522989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "145b5019b98d3b5b9a5c5dce839360d2c357f0ff",
      "name": "Walmart Vision & Glasses",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 608,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/100892701699852122725/photos\">Walmart Vision Center (inside Walmart)</a>"
          ],
          "photo_reference": "CmRaAAAAeiuc2musdUgrePMwlbVVqN6HG0HFpXgmHw6f-ySZcGgRFLS_JI8LCCavXZ7_yfVSbdSOLR2MbV7M1U0y9OywBmpMUR_-V2oNxrVST3B9E5_6ZKkLaQmnN6mSSbvj2rcsEhC7msqhEOiqQ5UU3D8cdrycGhTuk6uC4nJ7dXSqJCiVCR1XzdByUw",
          "width": 1080
        }
      ],
      "place_id": "ChIJI92MCsoDnogRgLQuuvW3nIE",
      "plus_code": {
        "compound_code": "22VQ+88 New Orleans, Louisiana",
        "global_code": "862G22VQ+88"
      },
      "price_level": 1,
      "rating": 4.3,
      "reference": "ChIJI92MCsoDnogRgLQuuvW3nIE",
      "scope": "GOOGLE",
      "types": [
        "health",
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 9,
      "vicinity": "6000 Bullard Ave, New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.9588827,
          "lng": -89.9842494
        },
        "viewport": {
          "northeast": {
            "lat": 29.96005782989272,
            "lng": -89.98298952010728
          },
          "southwest": {
            "lat": 29.95735817010728,
            "lng": -89.98568917989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "dd835c129767c7698a372b794d0df5ac54676134",
      "name": "Walmart Garden Center",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 1944,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/105251520469552599440/photos\">Jacqueline Delatte</a>"
          ],
          "photo_reference": "CmRaAAAAHaJTgNmEv79rLQsSYKbCtc7AuTxKi-j_LtvLq8imfGqhycRo4EPL2QhgTJGKgB4qvnLHUr_U0Ca7UHewU0p60cDrl1GcDLoYxTbJVx6VDSK5Ttz3eplgO2ZrOu8iuCRfEhD57atZps-eub-TmVYfJDWcGhRzZEppIQHXF2c6wsdxeHuLoYP2cQ",
          "width": 2592
        }
      ],
      "place_id": "ChIJY8Ii_UYdnogRCPzjsgdxXsA",
      "plus_code": {
        "compound_code": "X258+H8 Chalmette, Louisiana",
        "global_code": "76XGX258+H8"
      },
      "price_level": 1,
      "rating": 0,
      "reference": "ChIJY8Ii_UYdnogRCPzjsgdxXsA",
      "scope": "GOOGLE",
      "types": [
        "store",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 0,
      "vicinity": "8101 W Judge Perez Dr, Chalmette"
    },
    {
      "geometry": {
        "location": {
          "lat": 30.0433536,
          "lng": -89.9620266
        },
        "viewport": {
          "northeast": {
            "lat": 30.04472372989273,
            "lng": -89.96060542010727
          },
          "southwest": {
            "lat": 30.04202407010728,
            "lng": -89.96330507989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "95659cb36e398613505903c88c2ee7f0d8bfa57a",
      "name": "Walmart Deli",
      "photos": [
        {
          "height": 3264,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/109367266571544711308/photos\">Cameron Snowman</a>"
          ],
          "photo_reference": "CmRaAAAAURnXeM7RhUzkFr4e80JrfBhnXXhD1_EvtRdW96J77wBpSFw22sNiuRFVdjYHqtISZ4jZD1UYvk3aXpn2-2bZYDv7KfrTuiNYW2_sVd_RDMhY-tqoiP3qepfslZ8Sg9wKEhA9Dj_FMvzenXlZpTeVzAZkGhQYT-gj8mz7MVa8eoZyzCxgxPP-Yg",
          "width": 2448
        }
      ],
      "place_id": "ChIJ9cQSWLUDnogRDyVuvzBc_zM",
      "plus_code": {
        "compound_code": "22VQ+85 New Orleans, Louisiana",
        "global_code": "862G22VQ+85"
      },
      "price_level": 1,
      "rating": 3.2,
      "reference": "ChIJ9cQSWLUDnogRDyVuvzBc_zM",
      "scope": "GOOGLE",
      "types": [
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 9,
      "vicinity": "New Orleans"
    },
    {
      "geometry": {
        "location": {
          "lat": 29.9258076,
          "lng": -90.0703295
        },
        "viewport": {
          "northeast": {
            "lat": 29.92724157989272,
            "lng": -90.06905427010727
          },
          "southwest": {
            "lat": 29.92454192010728,
            "lng": -90.07175392989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
      "id": "d876a73352289997d44198b3b01a1472d9009c67",
      "name": "Walmart Deli",
      "opening_hours": {
        "open_now": true
      },
      "place_id": "ChIJeaXD1YCmIIYRSBeJWF9hOW0",
      "plus_code": {
        "compound_code": "WWGH+8V New Orleans, Louisiana",
        "global_code": "76XFWWGH+8V"
      },
      "price_level": 1,
      "rating": 3.3,
      "reference": "ChIJeaXD1YCmIIYRSBeJWF9hOW0",
      "scope": "GOOGLE",
      "types": [
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 3,
      "vicinity": "1901 Tchoupitoulas St, New Orleans"
    }
  ],
  "status": "OK"
}



app.get('/mapSearch', (req, res) => {
  const { place } = req.query
  // axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30, -90&radius=8000&keyword=${place}&key=AIzaSyAm0rv3w8tQUIPbjDkQyGhQUsK5rAxfBUs`)
  // .then((response)=> {
  //   console.log(response);
  //   res.send(response.data);
  // })
  // .catch((err) =>{
  //   res.send(err);
  // })
  let filteredResults = info.results.map((obj) => {
    return [obj.geometry.location, obj.name, obj.vicinity];
  })

  res.send(filteredResults);
});

app.post('/user', (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  db.addUser(username)
    .then(() => {
      res.statusCode = 201;
      res.end('User Added');
    });
});
app.patch('/user', (req, res) => {
  const { name, speed, distance } = req.body;
  db.updateUser({ name, speed, distance }, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
