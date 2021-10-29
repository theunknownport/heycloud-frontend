
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/bootstrap/css/bootstrap.min.css"
import './App.scss';
import "./assets/fonts/fontawesome-all.min.css"
import "./assets/fonts/font-awesome.min.css"
import "./assets/fonts/fontawesome5-overrides.min.css"
import "./assets/css/Animated-numbers-section.css"
import "./assets/css/Contact-Form-Clean.css"
import { datadogRum } from "@datadog/browser-rum";
import App from "./App";
import { Helmet } from 'react-helmet'

// datadogRum.init({
//   applicationId: '6b670441-d614-4c51-8b3c-d6518098e3ef',
//   clientToken: 'pub634357fb6bb8ba097ad55485f24295df',
//   site: 'datadoghq.com',
//   service: 'heycloud',
//   env: 'prod',
//   sampleRate: 100,
//   trackInteractions: true,
//   defaultPrivacyLevel: 'mask'
// });

// datadogRum.startSessionReplayRecording();

<Helmet>
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"></meta>
    <title>Login - Heycloud</title>
    <meta property="og:image" content="assets/img/logos/logo-white-small.png"></meta>
    <meta name="description" content="Heycloud.ch is a hosting service based in Switzerland. We provide virtual private servers and web hosting. Our cloud solution provides a control panel called the heycloud cockpit. It allows the customer to manage vps, networking and webhosting."></meta>
    <meta property="og:type" content=""></meta>
</Helmet>



ReactDOM.render(
  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")

);
