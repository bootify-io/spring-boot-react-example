import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { FlowerDTO } from 'app/flower/flower-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function FlowerList() {
  const { t } = useTranslation();
  useDocumentTitle(t('flower.list.headline'));

  const [flowers, setFlowers] = useState<FlowerDTO[]>([]);
  const navigate = useNavigate();

  const getAllFlowers = async () => {
    try {
      const response = await axios.get('/api/flowers');
      setFlowers(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: number) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/flowers/' + id);
      navigate('/flowers', {
            state: {
              msgInfo: t('flower.delete.success')
            }
          });
      getAllFlowers();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllFlowers();
  }, []);

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('flower.list.headline')}</h1>
      <div>
        <Link to="/flowers/add" className="btn btn-primary ms-2">{t('flower.list.createNew')}</Link>
      </div>
    </div>
    {!flowers || flowers.length === 0 ? (
    <div>{t('flower.list.empty')}</div>
    ) : (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">{t('flower.id.label')}</th>
            <th scope="col">{t('flower.name.label')}</th>
            <th scope="col">{t('flower.price.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {flowers.map((flower) => (
          <tr key={flower.id}>
            <td>{flower.id}</td>
            <td>{flower.name}</td>
            <td>{flower.price}</td>
            <td>
              <div className="float-end text-nowrap">
                <Link to={'/flowers/edit/' + flower.id} className="btn btn-sm btn-secondary">{t('flower.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(flower.id!)} className="btn btn-sm btn-secondary">{t('flower.list.delete')}</button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </>);
}
