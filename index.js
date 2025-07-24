import{a as m,S as p,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",g="51418093-89174c8449e8a26154b177f03";async function h(o){const r={key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await m.get(y,{params:r})).data}let b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function v(o,r){const i=o.map(({webformatURL:a,largeImageURL:e,tags:t,likes:s,views:d,comments:u,downloads:f})=>`
      <li class="gallery-item">
        <a href="${e}" class="gallery-link">
          <img src="${a}" alt="${t}" class="gallery-image" />
        </a>
        <div class="image-info">
          <div><b>Likes:</b> ${s}</div>
          <div><b>Views:</b> ${d}</div>
          <div><b>Comments:</b> ${u}</div>
          <div><b>Downloads:</b> ${f}</div>
        </div>
      </li>`).join("");r.insertAdjacentHTML("beforeend",i),b.refresh()}function L(o){o.innerHTML=""}function w(){document.querySelector(".loader-wrapper").classList.remove("is-hidden")}function S(){document.querySelector(".loader-wrapper").classList.add("is-hidden")}const c=document.querySelector(".form"),l=document.querySelector(".gallery");c.addEventListener("submit",async o=>{o.preventDefault();const r=c.elements["search-text"].value.trim();if(r){L(l),w();try{const i=await h(r);if(i.hits.length===0){n.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}v(i.hits,l)}catch{n.error({message:"Something went wrong. Try again later.",position:"topRight"})}finally{S()}}});
//# sourceMappingURL=index.js.map
