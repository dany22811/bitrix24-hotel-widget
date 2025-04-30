import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const elementId = urlParams.get('id');

    if (!elementId) {
      setError("ID элемента не указан");
      setLoading(false);
      return;
    }

    const webhookUrl = "https://b24-xwozh7.bitrix24.ru/rest/8/v4aimvko2vjd1yu1/crm.item.get";

    axios.post(webhookUrl, {
      entityTypeId: 1040,
      id: elementId
    })
    .then(response => {
      const item = response.data.result?.item;

      if (!item) {
        setError("Элемент не найден");
        return;
      }

      setData(item);

    })
    .catch(err => {
      setError("Ошибка загрузки данных");
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p style={{color: 'red'}}>{error}</p>;
  }

  return (
    <div>
      <h1>Информация об отеле</h1>
      <p><strong>ID элемента:</strong> {data.ID}</p>
      <p><strong>Название отеля:</strong> {data.UF_CRM_8_1745915405 || 'Не указано'}</p>
      <p><strong>Короткая информация:</strong> {data.UF_CRM_8_1745407351156 || 'Не указано'}</p>
    </div>
  );
};

export default App;