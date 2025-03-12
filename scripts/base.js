const transition = document.querySelector(".transition");

setTimeout(() => {
    transition.classList.remove("active");
}, 1)

const links = document.querySelectorAll("a");

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        transition.classList.add("active");

        setTimeout(() => {
            window.location = link.getAttribute("href");
        }, 250)
    })
})