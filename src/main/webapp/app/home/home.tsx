import React from 'react';
import { Link } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';
import useDocumentTitle from 'app/common/use-document-title';
import './home.scss';


export default function Home() {
  const { t } = useTranslation();
  useDocumentTitle(t('home.index.headline'));

  return (<>
    <h1 className="mb-4">{t('home.index.headline')}</h1>
    <p className="mb-5"><Trans i18nKey="home.index.text" components={{ a: <a />, strong: <strong /> }} /></p>
    <div className="col-md-4 mb-5">
      <h4 className="mb-3">{t('home.index.exploreEntities')}</h4>
      <div className="list-group">
        <Link to="/flowers" className="list-group-item list-group-item-action">{t('flower.list.headline')}</Link>
      </div>
    </div>
  </>);
}
