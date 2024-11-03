document.addEventListener('DOMContentLoaded', () => {


    const formElem = document.querySelector('form');

    formElem.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputValue = document.querySelector('[type="text"]').value;

        console.log(inputValue);

        const url2 = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(inputValue)}&utf8=&srlimit=10`;


        fetch(url2)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    const titles = data.query.search
                    console.log(titles);


                    titles.forEach(title => {
                        const _title = title.title;
                        const link2 = `https://en.wikipedia.org/wiki/${encodeURIComponent(_title)}`

                        const snippet = title.snippet.replace(/<span class="searchmatch">.*?<\/span>/g, '');

                            const rootElem = document.querySelector('.root');

                            const divContainer = document.createElement('div');
                            divContainer.classList.add('container')
                            rootElem.appendChild(divContainer)
                            const aElem = document.createElement('a')
                            aElem.setAttribute('href', link2 )
                            aElem.setAttribute('target', '_blank')
                            divContainer.appendChild(aElem);

                            aElem.innerHTML = `
                            <h2 class="title">${_title}</h2>
                            <p>${snippet}</p>
                            `

               })

                }


            })
            .catch(err => {
                console.error(err)
            })


    })

    const btnGetRandomArticle = document.querySelector('[type="button"]');

    const url = 'https://www.mediawiki.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*';

    btnGetRandomArticle.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const pageTitle = data.query.random[0].title;

                const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;

                window.location.href = link;

            })
            .catch((err) => {
                console.error('fetch random article error', err)
            })


    })

})