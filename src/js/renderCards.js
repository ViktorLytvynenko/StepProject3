
import createCard from "./createCard";
import filter from "./filter"; 

import instance from './Assets/axiosInstances';
import { createRecordsButton } from './Assets/createRecondsBtn';
import { renderCardsList } from './Assets/renderList';

const records = document.querySelector("#records");


const renderCards = () => {
    const token = localStorage.getItem("token");
    instance.get("/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        filter()
        if (res.data.length >= 0) {
            renderCardsList(res.data)
        } else {
            records.innerHTML += `${createRecordsButton()}`
        }
        let btnCreate = document.querySelector('#recordsButton')
        btnCreate.addEventListener('click', () => {
            createCard()
        })
    })
}

export default renderCards