'use strict';

// evado/web/jam/utility/I18n.js

// extend default translation category
// use: <span data-t="">Some text</span>
// use: <div title="Some text"></div>
// use: <input placeholder="Some text" type="text" />

Object.assign(Jam.I18n.defaults, {

    'Test utility': 'Тестовая утилита'
});

// define custom translation category
// use: <span data-t="custom">Any text</span>
// use: <div data-t="custom" title="Any text"></div>
// use: <input data-t="custom" placeholder="Any text" type="text"/>
// use: <div data-t-title="customTitle" title="Any title" data-t="custom">Any text</div>

Jam.I18n.custom = {

    'Any text': 'Любой текст'
};

Jam.I18n.customTitle = {

    'Any title': 'Любой заголовок'
};

// METADATA

Jam.I18n.meta = {

    'All articles': 'Все статьи',
    'All comments': 'Все комментарии',
    'Article': 'Статья',
    'Articles': 'Статьи',

    'Categories': 'Категории',
    'Category': 'Категория',
    'Comment': 'Комментарий',
    'Comments': 'Комментарии',
    'Content': 'Содержание',
    'Created at': 'Создано',
    'Creator': 'Создатель',

    'Date': 'Дата',
    'Description': 'Описание',
    'Draft articles': 'Черновики статей',

    'File': 'Файл',

    'Hidden comments': 'Скрытые комментарии',

    'Main photo': 'Основное фото',

    'Name': 'Название',

    'Order number': 'Порядковый номер',

    'Pending comments': 'Ожидающие модерации',
    'Photo': 'Фото',
    'Photos': 'Фотографии',
    'Public articles': 'Публичные статьи',
    'Public article counter': 'Счетчик публичных статей',

    'State': 'Состояние',
    'Status': 'Статус',
    'Subtitle': 'Подзаголовок',

    'Title': 'Заголовок',
};

Jam.I18n['meta.class.article'] = {

    'Archived': 'Архивировано',

    'Draft': 'Черновик',

    'Published': 'Опубликовано',
};

Jam.I18n['meta.class.comment'] = {

    'Creation info': 'Информация о создании',

    'Hide': 'Скрыть',
    'Hide unwanted comment from visitors': 'Скрыть нежелательный комментарий от посетителей',
    'Hidden': 'Скрыт',
    'Hidden state': 'Скрыт',

    'Make comment visible to visitors': 'Сделать комментарий видимым для посетителей',
    'Moderate': 'Модерировать',

    'Name': 'Имя',

    'Pending': 'На модерации',
    'Pending state': 'Ожидает модерации',
    'Publish': 'Опубликовать',
    'Published': 'Опубликован',
    'Published state': 'Опубликован',

    'Send comment on moderation': 'Отправить комментарий на модерацию',

    'Visitors will not see a hidden comment. Hide?': 'Посетители не увидят скрытый комментарий. Скрыть?'
};