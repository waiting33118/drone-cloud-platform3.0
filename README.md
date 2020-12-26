# drone-cloud-platform3.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Design-blueprint

#### Views頁面
1. App.vue
    - Appbar.vue 頂部
    
1. Home.vue
    - ControlPanel.vue 左上角
    - Stream.vue 左下角
    - Mapbox.vue 右邊
1. Mapbox.vue
    - 左上角有一個小dashboard做狀態即時顯示

#### 資料流 props & emits
1. Home
    - 登入後才開始連線socket
    - 進入到Home才開始監聽drone飛行data
    - **[props]** droneSource => control panel (各個開關根據狀態復位)
    - **[props]** droneSource => mapbox (左上角即時飛行dashboard)
1. ControlPanel
   - Tabs分頁
        1. Control
            - **[component/emits]** Arm/Disarm
            - **[component/emits]** Takeoff/Land
            - **[component/emits]** Altitude & Speed
            - **[component]** Goto
        2. Servo
        3. Camera
        4. Log
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
