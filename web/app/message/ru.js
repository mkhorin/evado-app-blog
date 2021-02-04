'use strict';
/**
 * Extend default translations
 *
 * Use: Jam.t('Some text')
 * Use: <span data-t="">Some text</span>
 * Use: <div title="Some text" data-t=""></div>
 * Use: <input placeholder="Some text" type="text" data-t="">
 */
Object.assign(Jam.I18n.defaults, {

    'Test utility': 'Тестовая утилита'
});

/**
 * Define custom translation category
 *
 * Use: Jam.t('Some text', 'custom')
 * Use: <span data-t="custom">Some text</span>
 * Use: <div title="Some text" data-t="custom"></div>
 * Use: <input placeholder="Some text" type="text" data-t="custom">
 * Use: <div title="Some text" data-t-title="custom" data-t="">Text</div>
 */
Jam.I18n.custom = {

    'Some text': 'Некоторый текст'
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