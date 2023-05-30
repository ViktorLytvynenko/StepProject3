import Modal from "bootstrap/js/src/modal"
import instance from "./Assets/axiosInstances";
import {setStorage, getStorage} from "./localStorage";
import {Notify} from 'notiflix/build/notiflix-notify-aio';

import renderCards from "./renderCards";

const buttonAuth = document.querySelector("#buttonAuth");
const modalWindow = document.querySelector("#exampleModal");

const privatePolicy = document.querySelector("#privatePolicy");
const agree = document.querySelector("#agree");
const disagree = document.querySelector("#disagree");
const newCard = document.querySelector("#newCard");
//openCard();

// возвращение на первый шаг
const firstStep = () => {
    newCard.style.height = "25%";
    newCard.innerHTML = `
            <p>Оберіть будь-ласка до кого Ви хотіли б записатися
        <div class="new-card_exit-container">
    <button class="btn btn-danger new-card_exit-container_exit" id="btnExit">
        <i style="color: white" class="fa-solid fa-x"></i>
    </button>
</div>
    </p>
    <hr>
    <select id="newCardDoctors" class="header_center_search_select">
        <option disabled selected value="none">Зробіть свій вибір</option>
        <option value="cardiolog">Кардіолог</option>
        <option value="stomatolog">Стоматолог</option>
        <option value="terapevt">Терапевт</option>
    </select>
    <div class="new-card_container">
        <button class="btn btn-primary new-card_container_nextStep" id="btnNextStep">Далі</button>
    </div>
`
}

// создаем функцию на закрытие кнопки
const exit = () => {
    const btnExit = document.querySelector("#btnExit");
    btnExit.addEventListener("click", () => {
        newCard.style.display = "none";
        document.body.style.backgroundColor = "white";
        firstStep();
        const btnNextStep = document.querySelector("#btnNextStep");
        exit();
        nextStep();
    })
}
exit();

// создаем функцию на нажатие кнопки назад
const back = () => {
    const btnBack = document.querySelector("#btnBack");
    btnBack.addEventListener("click", () => {
        firstStep();
        const btnNextStep = document.querySelector("#btnNextStep");
        exit();
        nextStep();
    })
}

// выйти с меню
const exitButton = () => {
    window.location.reload()
}

//создаем кнопку на создание карточек
const createRecordsButton = () => {
    if (document.querySelector("#recordsButton")) {
        return "";
    } else {
        return `<button id="recordsButton" class="header_center_table_button">Створити візит &#128515;&#128151;</button>`;
    }
}

// отказ от политики конфиденциальности
disagree.addEventListener("click", () => {
    window.location.reload()
})

// создаем анимацию при входе
const greetings = () => {
    const gifka = document.querySelector("#gifka");
    gifka.style.display = "block";
    setTimeout(() => {
        renderCards()
        gifka.style.display = "none";
    }, 2000);
}

// подтверждение создания карточки
const createVisit = () => {
    const btnCreate = document.querySelector("#btnCreate");
    btnCreate.addEventListener("click", () => {
        document.body.style.backgroundColor = "white";
        newCard.style.display = "none";
    })
}

// согласие на политику конфиденциальности
agree.addEventListener("click", () => {
    privatePolicy.style.display = "none";

    const person = {
        email: form.email.value,
        password: form.password.value
    }
    if (person.email.length != 0 || person.password.length != 0) {

        instance.post("/login", {
            ...person
        }).then(res => {
            if (res.status === 200) {
                localStorage.setItem("token", res.data);
                setStorage("email", person.email);
                setStorage("password", person.password);
                greetings();
            }
        })

    } else {
        console.log('Error, please write inputs');
        privatePolicy.style.display = "none";
    }
})

const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
};

// авторизация
buttonAuth.addEventListener("click", () => {
    const person = {
        email: form.email.value,
        password: form.password.value
    }
    if (person.email.length != 0 && person.password.length != 0) {
        privatePolicy.style.display = "block";
        const modal = Modal.getInstance(modalWindow);
        modal.hide();
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        modalBackdrop.parentNode.removeChild(modalBackdrop);
    }

})

// делаем запрос на получение данных


// Добавляем событие на нажатие ДАЛЬШЕ в пошаговом меню. Следующий шаг
const nextStep = () => {
    const btnNextStep = document.querySelector("#btnNextStep");
    btnNextStep.addEventListener("click", () => {
        const newCardDoctors = document.querySelector("#newCardDoctors");
        switch (newCardDoctors.value) {


            case "cardiolog": {
                newCard.style.height = "55%";
                newCard.innerHTML = `<p>Заповніть будь-ласка форму
        <div class="new-card_exit-container">
    <button class="btn btn-danger new-card_exit-container_exit" id="btnExit">
        <i style="color: white" class="fa-solid fa-x"></i>
    </button>
</div>
    </p>
    <hr>
<input class="new-card_input" placeholder="ПІБ" type="text">
<input class="new-card_input" placeholder="Вік" type="number">
<input class="new-card_input" placeholder="Ваш тиск" type="text">
<input class="new-card_input" placeholder="Індекс маси тіла" type="text">
<input class="new-card_input" placeholder="Перенесені захворювання серцево-судинної системи" type="text">
<input class="new-card_input" placeholder="Мета візиту" type="text">
<textarea class="new-card_input new-card_textarea" placeholder="Короткий опис візиту" type="text"></textarea>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
</select>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Пошук по статусу</option>
                <option>Відкрит</option>
                <option>Закрит</option>
</select>
<div class="new-card_container">
        <button class="btn btn-primary new-card_container_nextStep" id="btnCreate">Створити</button>
</div>
<button class="btn btn-secondary new-card_backStep" id="btnBack">Назад</button>
`;
                exit();
                back();
                createVisit();
                break
            }


            case "stomatolog": {
                newCard.style.height = "45%";
                newCard.innerHTML = `<p>Заповніть будь-ласка форму
        <div class="new-card_exit-container">
    <button class="btn btn-danger new-card_exit-container_exit" id="btnExit">
        <i style="color: white" class="fa-solid fa-x"></i>
    </button>
</div>
    </p>
    <hr>
<input class="new-card_input" placeholder="ПІБ" type="text">
<p>введіть дату останнього візиту</p>
<input class="new-card_input" placeholder="MM/DD/YYYY" type="date">
<input class="new-card_input" placeholder="Мета візиту" type="text">
<textarea class="new-card_input new-card_textarea" placeholder="Короткий опис візиту" type="text"></textarea>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
</select>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Пошук по статусу</option>
                <option>Відкрит</option>
                <option>Закрит</option>
</select>
<div class="new-card_container">
        <button class="btn btn-primary new-card_container_nextStep" id="btnCreate">Створити</button>
</div>
<button class="btn btn-secondary new-card_backStep" id="btnBack">Назад</button>
`;
                exit();
                back();
                createVisit();
                break
            }


            case "terapevt": {
                newCard.style.height = "45%";
                newCard.innerHTML = `<p>Заповніть будь-ласка форму
        <div class="new-card_exit-container">
    <button class="btn btn-danger new-card_exit-container_exit" id="btnExit">
        <i style="color: white" class="fa-solid fa-x"></i>
    </button>
</div>
    </p>
    <hr>
<input class="new-card_input" placeholder="ПІБ" type="text">
<input class="new-card_input" placeholder="Вік" type="number">
<input class="new-card_input" placeholder="Мета візиту" type="text">
<textarea class="new-card_input new-card_textarea" placeholder="Короткий опис візиту" type="text"></textarea>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Терміновість візиту</option>
                <option>Короткий запис</option>
                <option>Звичайний запис</option>
                <option>Тривалий запис</option>
</select>
<select class="header_center_search_select new-card_input">
                <option disabled selected>Пошук по статусу</option>
                <option>Відкрит</option>
                <option>Закрит</option>
</select>
<div class="new-card_container">
        <button class="btn btn-primary new-card_container_nextStep" id="btnCreate">Створити</button>
</div>
<button class="btn btn-secondary new-card_backStep" id="btnBack">Назад</button>
`;
                exit();
                back();
                createVisit();
                break
            }
            default: {
                Notify.warning('Зробіть будь-ласка свій вибір');
            }
        }
    })
}
nextStep()

// вызываем localstorage
form.email.value = getStorage("email")
form.password.value = getStorage("password");


/**
 * *jkcdcjn
 */