import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import PricingItemDemo from './demo/pricing-item';

const utilTabs = [
  {
    label: 'pricing-items',
    component: <PricingItemDemo />,
  },
];
export default function UtilsPage() {
  const [tabItem, setTabItem] = useState(utilTabs[0]);
  const handleTabChange = (_, tabKey) => {
    if (tabKey === tabItem.label) return;
    setTabItem(utilTabs.find((item) => item.label === tabKey) || utilTabs[0]);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabItem.label}
          onChange={handleTabChange}
          aria-label="utils example"
          textColor="secondary"
          indicatorColor="secondary">
          {utilTabs.map((tab) => {
            return <Tab label={tab.label} key={tab.label} value={tab.label} />;
          })}
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>{tabItem.component}</Box>
    </>
  );
}
