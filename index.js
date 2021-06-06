

console.log('connected')
Preview()

const Submit_form = document.querySelector('#Submit-Form')

Submit_form.addEventListener('submit', (e) => {
    e.preventDefault()
    //Getting url
    const Url = document.querySelector('.form-control').value

    //du=isable button untill we get the reuslt

    //send the request
    if (Url) {
        document.getElementById('short').disabled = true
        document.getElementById('short').innerHTML = `Please Wait`


        sendAjaxRequest(Url)

        Copy()



    }


})

const sendAjaxRequest = async (query) => {
    console.log(query)

    const xhr = new XMLHttpRequest()

    xhr.open('GET', `https://api.shrtco.de/v2/shorten?url=${query}`, true)

    xhr.onload = async function () {
        if (this.status === 201) {
            const { result } = await JSON.parse(this.responseText)
            console.log(result)

            var new_Obj = {
                Org: result.original_link,
                Short: result.full_short_link3
            }

            if (localStorage.getItem('data') == null) {
                localStorage.setItem('data', '[]')
            }
            var old_data = JSON.parse(localStorage.getItem('data'))
            old_data.push(new_Obj)

            localStorage.setItem('data', JSON.stringify(old_data))

            document.getElementById('short').disabled = false
            document.getElementById('short').innerHTML = `Shorten It!`

            document.querySelector('.form-control').value = ''

            Preview()
            Copy()



        } else {
            console.log('cannot fetch request')
        }

    }

    xhr.send()
}

function Preview() {
    const Url_Container = document.querySelector('.url__container')
    if (localStorage.getItem('data') != null) {
        const Data = JSON.parse(localStorage.getItem('data'))
        let html = ""


        Data.forEach((val, i, arr) => {
            html += ` 
            <span>&nbsp;&nbsp;&nbsp;</span>
              <div class="col-sm-12 col-md-12 col-lg-6 Url__col my-2">
                 <div class="url">
                     <h4 class="correct__url">
                        ${val.Org}
                     </h4>
                 </div>
             </div>
             <div class="col-sm-12 col-md-12 col-lg-6">
                 <div class="res__url">
                     <h4 class="resolved__url">
                         ${val.Short}
                    </h4>
                    <button  class="btn  copy mx-2">Copy</button>
                 </div>
             </div>
             
                 `
        })

        Url_Container.innerHTML = html



    }
}





function Copy() {
    var copyText = document.querySelectorAll(".copy");
    copyText.forEach((Val) => {
        Val.addEventListener('click', (e) => {
            if (!Val.classList.contains('copied')) {
                console.log(Val)
                const Copy_Text = Val.previousElementSibling.innerText
                let input = document.createElement('input')
                input.setAttribute('value', Copy_Text)
                document.body.appendChild(input)
                input.select()
                input.setSelectionRange(0, 99999)
                document.execCommand("copy");
                document.body.removeChild(input)
                Val.classList.add('copied')
                Val.innerHTML = 'Copied'
            } else {
                alert('already copied')
            }


        })
    })


}

Copy()

const Ham = document.querySelector('.responsive-ham')

Ham.addEventListener('click', (e) => {
    const Link = e.target.closest('.responsive-ham')
    const Nav = document.querySelector('.custom-nav-bar')
    const Nav_custom=document.querySelector('.nav-links-custom')
    console.log(Link.firstElementChild.classList)

    if (!Link.firstElementChild.classList.contains('hidden')) {

        Link.firstElementChild.classList.add('hidden')
        Link.firstElementChild.nextElementSibling.classList.remove('hidden')
        Nav.classList.add('custom-nav-bar-active')
        Nav_custom.classList.add('nav-links-custom-active')

    } else {
        Link.firstElementChild.classList.remove('hidden')
        Link.firstElementChild.nextElementSibling.classList.add('hidden')
        Nav.classList.remove('custom-nav-bar-active')
        Nav_custom.classList.remove('nav-links-custom-active')
    }
})