import '@iconify/iconify';

import SessionManager from '@arcblock/did-connect/lib/SessionManager';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import Dashboard from '@blocklet/ui-react/lib/Dashboard';
import styled from '@emotion/styled';
import { Outlet, useNavigate } from 'react-router-dom';

import { useSessionContext } from '../../contexts/session';

function HeaderAddon() {
  const { session } = useSessionContext();
  const { locale } = useLocaleContext();

  return (
    <>
      <LocaleSelector className="locale-selector" showText={false} />
      <SessionManager locale={locale} session={session} />
    </>
  );
}

function AdminLayout() {
  const { session } = useSessionContext();
  const { t } = useLocaleContext();
  const navigate = useNavigate();

  if (!session.user) {
    return navigate('/admin/login');
  }

  const title = window.blocklet.appName ? t('admin.title', { appName: window.blocklet.appName }) : t('admin.title');

  return (
    <Main title={title} headerProps={{ addons: <HeaderAddon /> }}>
      <Outlet />
    </Main>
  );
}

const Main = styled(Dashboard)`
  position: relative;
  height: 100%;

  .dashboard-sidebar {
    width: 120px;
  }
  .dashboard-footer {
    margin-top: 0;
  }

  .dashboard-content {
    max-width: 1680px;
  }
`;

export default AdminLayout;
