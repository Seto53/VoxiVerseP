"use client";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import styled from "@mui/material/styles/styled";

const TabListStyled = styled(TabList)(({theme}) => ({
    backgroundColor: "var(--noble-black-700)",
    borderBottom: "0 !important",
    "& .MuiTabs-indicator": {
        display: "none",
    },
    "& .Mui-selected": {
        boxShadow: theme.shadows[2],
        backgroundColor: "var(--noble-black-500)",
        color: `var(--noble-black-100) !important`,
    },
    "& .MuiTab-root": {
        backgroundColor: "var(--noble-black-600)",
        lineHeight: 1,
        borderRadius: theme.shape.borderRadius,
        color: "var(--noble-black-300)",
        marginRight: theme.spacing(1),
        padding: "10px px 10px 5px !important", // Adjust padding
        margin: "10px 5px 10px 5px !important", // Adjust margin
        minHeight: "5px !important", // Set minimum height
        "&:hover": {
            color: "var(--stem-green-600)",
        },
    },
}));

const Category = ({categories, category, setCategory}) => {
    if (!categories) return <></>;

    const handleChange = (event, newCategory) => {
        setCategory(newCategory);
    };

    return (
        <TabContext value={category}>
            <TabListStyled
                scrollButtons
                variant="scrollable"
                onChange={handleChange}
                aria-label="forced scroll tabs example"
                sx={{
                    color: "var(--noble-black-100)",
                }}
            >
                {categories.main.concat(categories.sub).map((category, i) => (
                    <Tab
                        key={i}
                        label={category}
                        value={category}
                        sx={{
                            fontFamily: "var(--font-plus-jakarta-sans)",
                            fontSize: "var(--font-m)",
                        }}
                    />
                ))}
            </TabListStyled>
        </TabContext>
    );
};

export default Category;
