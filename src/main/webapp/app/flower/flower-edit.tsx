import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FlowerDTO } from 'app/flower/flower-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    name: yup.string().emptyToNull().max(255).required(),
    price: yup.string().emptyToNull().numeric(10, 2).required()
  });
}

export default function FlowerEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('flower.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = +params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/flowers/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateFlower = async (data: FlowerDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/flowers/' + currentId, data);
      navigate('/flowers', {
            state: {
              msgSuccess: t('flower.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('flower.edit.headline')}</h1>
      <div>
        <Link to="/flowers" className="btn btn-secondary">{t('flower.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateFlower)} noValidate>
      <InputRow useFormResult={useFormResult} object="flower" field="id" disabled={true} type="number" />
      <InputRow useFormResult={useFormResult} object="flower" field="name" required={true} />
      <InputRow useFormResult={useFormResult} object="flower" field="price" required={true} />
      <input type="submit" value={t('flower.edit.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
