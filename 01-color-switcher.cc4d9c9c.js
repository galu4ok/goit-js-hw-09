!function(){var t=null,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),a=document.body;e.addEventListener("click",function(){e.disabled=!0,n.disabled=!1,t=setInterval(function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))},1e3)}),n.addEventListener("click",function(){e.disabled=!1,n.disabled=!0,clearInterval(t)})}();
//# sourceMappingURL=01-color-switcher.cc4d9c9c.js.map
