import instance from "./Assets/axiosInstances"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const modal = document.querySelector('.cardCreate')
const postNewCard = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const newCard = JSON.parse(localStorage.getItem("newCard"));
    instance.post('/', newCard, config)
        .then((res) => {
            if (res.status == 200) {
                modal.innerHTML = `
                    <p class="createTitle">Нова картка створена</p>
                `
                setTimeout(() => {
                    modal.style.display = 'none'
                }, 2500)
            }
        })
}

const exitButton = () => {
    let closeModalButton = document.querySelector('#closeModalButton')
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}



const setCardiologist = () => `
    <li class="editItem">
        <p class="editParam">Протипоказання</p>
        <input id="form" class="editInput" type="text" formName="contraindication" placeholder="Напишіть протипоказання">
    </li>
    <li class="editItem">
        <p class="editParam">Дата останнього візиту</p>
        <input id="formTitle" class="editInput" type="date" formName="lastVisit" >
    </li>
`
const setStomatolog = () => ` 
    <li class="editItem">
        <p class="editParam">Номер телефону</p>
        <input id="form" class="editInput" type="text" formName="phoneNumber" placeholder="Напишіть ваш номер телефону">
    </li>
    <li class="editItem">
        <p class="editParam">Номер страхової картки</p>
        <input id="form" class="editInput" type="text" formName="insurance" placeholder="Напишіть номер строхової картки">
    </li>
`
const setTerapevt = () => `
    <li class="editItem">
        <p class="editParam">Адрес</p>
        <input id="form" class="editInput" type="text" formName="address" placeholder="Напишіть ваш адрес проживання">
    </li>
    <li class="editItem">
        <p class="editParam">Висновок</p>
        <input id="form" class="editInput" type="text" formName="conclusion" placeholder="Напишіть висновок">
    </li>
`
const stemForm = (doctor) => {
    let doctorForm
    switch (doctor) {
        case 'cardiologist':
            doctorForm = setCardiologist()
            break;
        case 'stomatolog':
            doctorForm = setStomatolog()
            break;
        case 'terapevt':
            doctorForm = setTerapevt()
            break;
        default:
            doctorForm = '';
    }
    modal.innerHTML = `
    <p class="createTitle">Заповнення форми</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <ul class="editList">
       
        <li class="editItem">
            <p class="editParam">Назва</p>
            <input id="formTitle" class="editInput" type="text" formName="title" placeholder="Напишіть назву візиту">
        </li>
        <li class="editItem">
            <p class="editParam">ПІБ</p>
            <input id="formTitle" class="editInput" type="text" formName="name" placeholder="Напишіть ПІБ">
        </li>
        ${doctorForm}
        <li class="editItem">
            <p class="editParam">Вік</p>
            <input id="formAge" class="editInput" type="text" formName="age" placeholder="Напишіть вік">
        </li>
        <li class="editItem">
            <p class="editParam">Вага</p>
            <input id="formWeight" class="editInput" type="text" formName="weight" placeholder="Напишіть вагу">
        </li>
        <li class="editItem">
            <p class="editParam">BP</p>
            <input id="formBp" class="editInput" type="text" formName="bp" placeholder="Напишіть тиск">
        </li>
        <li class="editItem">
            <textarea id="formTitle" class="editInput" type="text" formName="description" placeholder="Напишіть опис візиту"></textarea>
        </li>
    </ul>
    </div>
    <div class="createBtns">
        <button id="btnPrevToSelect" class="createBtns_item editCancle">Назад</button>
        <button id="btnSaveCard" class="createBtns_item editSave">Створити</button>
    </div>
    `
    const btnPrev = document.querySelector('#btnPrevToSelect')
    btnPrev.addEventListener('click', () => {
        stepSelectTime()
    })
    const btnSaveCard = document.querySelector('#btnSaveCard')
    btnSaveCard.addEventListener('click', () => {
        const formArr = document.querySelectorAll('.editInput')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard
        }
        formArr.forEach((el) => {
            newCard = {
                ...newCard,
                [el.getAttribute('formName')]: el.value ? el.value : 'не заповнено'
            }
        })
        localStorage.setItem('newCard', JSON.stringify(newCard))
        postNewCard()
    })

    exitButton();
}

const stepSelectTime = () => {
    modal.innerHTML = `
    <p class="createTitle">Вибір часу</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <select id="changeTime" class="selectCreate selectItem">
            <option disabledТерміновість візиту</option>
                <option selected>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
    </select>
    </div>
    <div class="createBtns">
        <button id="btnPrev" class="createBtns_item editCancle">Назад</button>
        <button id="goToForm" class="createBtns_item editSave">Далі</button>
    </div>
    `
    const btnPrev = document.querySelector('#btnPrev')
    btnPrev.addEventListener('click', () => {
        createCard()
    })
    const btnGoToForm = document.querySelector('#goToForm')
    btnGoToForm.addEventListener('click', () => {
        const selectTime = document.querySelector('#changeTime')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            time: selectTime.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stemForm(newCard.doctor)
    })

    exitButton();
}
const createCard = () => {
    localStorage.setItem('newCard', JSON.stringify({}))
    modal.style.display = 'flex'
    modal.innerHTML = `
    <p class="createTitle">Створити новий запис</p>
    <button id="closeModalButton" class="closeModal">X</button>
    <div class="cardCreate_body">
    <select id="changeDoctor" class="selectCreate selectItem">
        <option disabled value="none">Зробіть свій вибір</option>
        <option selected value="cardiologist">Кардіолог</option>
        <option value="stomatolog">Стоматолог</option>
        <option value="terapevt">Терапевт</option>
    </select>
    </div>
    <div class="createBtns">
        <button class="createBtns_item editCancle">Вийти</button>
        <button id="goToTime" class="createBtns_item editSave">Далі</button>
    </div>
    `
    const btnExit = document.querySelector('.createBtns_item')
    btnExit.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    const goToTime = document.querySelector('#goToTime')
    goToTime.addEventListener('click', () => {
        const selectDoctorEl = document.querySelector('#changeDoctor')
        let newCard = JSON.parse(localStorage.getItem('newCard'))
        newCard = {
            ...newCard,
            doctor: selectDoctorEl.value
        }
        localStorage.setItem('newCard', JSON.stringify(newCard))
        stepSelectTime()
    })

    exitButton();

}

export default createCard