import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
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

export default function FlowerAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('flower.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createFlower = async (data: FlowerDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/flowers', data);
      navigate('/flowers', {
            state: {
              msgSuccess: t('flower.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('flower.add.headline')}</h1>
      <div>
        <Link to="/flowers" className="btn btn-secondary">{t('flower.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createFlower)} noValidate>
      <InputRow useFormResult={useFormResult} object="flower" field="name" required={true} />
      <InputRow useFormResult={useFormResult} object="flower" field="price" required={true} />
      <input type="submit" value={t('flower.add.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
