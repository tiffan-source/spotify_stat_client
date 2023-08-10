import React, { useRef, useState, useEffect } from 'react';

interface TabBar {
  tabsRef: React.MutableRefObject<Array<HTMLElement | null>>;
  activeTabIndex: number | null;
  tabUnderlineWidth: number;
  tabUnderlineLeft: number;
  setActiveTabIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useTabBar = (): TabBar => {
  const tabsRef = useRef<Array<HTMLElement | null>>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  useEffect(() => {
    if (activeTabIndex === null) return;

    const setTabPosition = (): void => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return {
    tabsRef,
    activeTabIndex,
    tabUnderlineWidth,
    tabUnderlineLeft,
    setActiveTabIndex,
  };
};
