// import { memo, useState } from "react";
// import styles from "./objective-tree-view.module.scss";
// import clsx from "clsx";

// const ChartDescriptionPanel = memo(() => {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const togglePanel = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // return (
//   //   <div
//   //     className={clsx(styles.chartDescriptionPanel, {
//   //       [styles.collapsed]: !isExpanded,
//   //     })}
//   //   >
//   //     {/* <IconButton
//   //         size="small"
//   //         onClick={togglePanel}
//   //         disableTouchRipple
//   //         sx={{ borderRadius: 0, color: 'black' }}
//   //         className={styles.toggleButton}>
//   //         <Icon iconName={isExpanded ? "back-left" : "forward-right"} />
//   //       </IconButton> */}
//   //     {isExpanded && (
//   //       <div className={styles.panelContent}>
//   //         <div className={styles.panelHeader}>
//   //           <h3 className={styles.panelTitle}>
//   //             {t("PAGES.DASHBOARD.OKR_LEGENDS.OKR_LEGEND_TITLE")}
//   //           </h3>
//   //         </div>
//   //         <div className={styles.legendSection}>
//   //           <div className={styles.legendTitle}>
//   //             {t("PAGES.DASHBOARD.OKR_LEGENDS.STATUS")}
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.legendIndicator, styles.inDue)} />
//   //             <span>{t("PAGES.DASHBOARD.OKR_LEGENDS.IN_DUE")}</span>
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.legendIndicator, styles.overDue)} />
//   //             <span>{t("PAGES.DASHBOARD.OKR_LEGENDS.OVERDUE")}</span>
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div
//   //               className={clsx(styles.legendIndicator, styles.notCheckInYet)}
//   //             />
//   //             <span>{t("PAGES.DASHBOARD.OKR_LEGENDS.NOT_CHECKED_IN")}</span>
//   //           </div>
//   //         </div>
//   //         <div className={styles.legendSection}>
//   //           <div className={styles.legendTitle}>
//   //             {t("PAGES.DASHBOARD.OKR_LEGENDS.CONFIDENCE_LEVEL")}
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.chipPreview, styles.stable)} />
//   //             <span>{t("PAGES.DASHBOARD.OVERALL_STATUS.STABLE")}</span>
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.chipPreview, styles.normal)} />
//   //             <span>{t("PAGES.DASHBOARD.OVERALL_STATUS.NORMAL")}</span>
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.chipPreview, styles.notGood)} />
//   //             <span>{t("PAGES.DASHBOARD.OVERALL_STATUS.NOT_GOOD")}</span>
//   //           </div>
//   //           <div className={styles.legendItem}>
//   //             <div className={clsx(styles.chipPreview, styles.notAvailable)} />
//   //             <span>{t("PAGES.DASHBOARD.OVERALL_STATUS.NOT_AVAILABLE")}</span>
//   //           </div>
//   //         </div>
//   //         <div className={styles.legendSection}>
//   //           <div className={styles.legendTitle}>
//   //             {t("PAGES.DASHBOARD.OKR_LEGENDS.INTERACTIONS")}
//   //           </div>
//   //           <div className={styles.instructionItem}>
//   //             <Icon iconName="mouse" />
//   //             <span>{t("PAGES.DASHBOARD.OKR_LEGENDS.CLICK_NODE")}</span>
//   //           </div>
//   //           <div className={styles.instructionItem}>
//   //             <Icon iconName="lock-closed" />
//   //             <span>{t("PAGES.DASHBOARD.OKR_LEGENDS.CTRL_SCROLL")}</span>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     )}
//    // </div>
//   //);
//   return null;
// });

// export default ChartDescriptionPanel;
