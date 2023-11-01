document.querySelector(".cube-list").addEventListener('click', (event) => {
    const target = event.target
    if(target.classList.contains("details")){
        const desc = target.parentNode.querySelector('.cube-description');
        if(desc.style.display == "block"){
            desc.style.display = 'none';
            target.textContent = 'Show More';
        } else {
            desc.style.display = 'block';
            target.textContent = 'Show Less';
        }
    }
})