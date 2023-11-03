* TO RUN APP
- yarn && yarn build && yarn start
- for dev mode -> yarn dev

* all images must be places within public folder

* for dynamic variables like COUNT_DOWN time could be added into env file or global-config.ts

** ALL translations values can be found under lang folder in corresponding json file.
** In order to update or add a new image first of all image must be placed in public folder 
- than in global-config.ts at root import accordingly to replace example logo 
- import logo from "./public/logo.png"; -> change right side of from to update image

** all dynamic colors like background color bound to tailwindcss primary warn error etc. colors can be found under
- tailwind.config.js if you change primary color you can directly see all places where it accesses will be changed.

** please fill env variables and global-configs (youtube link etc.) accordingly to your needs.
- for env two variables needed 
1. NEXT_PUBLIC_TIME_TILL_DATE="2022-12-05T17:35+03:00"  # COUNTDOWN END
2. NEXT_PUBLIC_AIRDROP_SUBMIT_API="https://test-domain.com" # FORM SUBMIT API