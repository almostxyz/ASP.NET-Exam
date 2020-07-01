import React, { Component } from 'react'

export function About() {
    return (
        <div className="container">
            <h2 className="text-info">О программе</h2>
            <h4>Задание выполнил студент группы ДИПРб-3 Хазбулатов Руслан</h4>
            <h6>Реализовать сервис учета студентов по группам.</h6>
            <ul>
                <li>Приложение должно иметь две страницы встроенные в один шаблон (masterpage)</li>
                <li>Страница "О программе" статичная и должна содержать ФИО студента, выполнившего работу, и текст задания</li>
                <li>Страница "Главная" содержит выпадающий список групп и таблицу со списком студентов группы</li>
                <li>Каждая строка таблицы - ФИО и номер зачетной книжки</li>
            </ul>
            <h6>Должны иметься возможности:</h6>
            <ol>
                <li>Просматривать список студентов в разных группах</li>
                <li>Добавлять студентов</li>
                <li>Редактировать данные студента</li>
                <li>Удалять студента</li>
            </ol>


        </div>
    )
}