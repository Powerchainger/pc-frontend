import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, List, ListItem, Divider, Collapse, Typography, Button, Popover } from "@mui/material";
import { styled } from "@mui/system";
import tw from 'twin.macro';
import { Notice } from '../components/types';



const dummyNotices: Notice[] = [
    {
        device: "Device A",
        time: "10:30 AM",
        wattage: 1000,
        extra: "Device A has been identified as a high energy consumer. It is recommended to ensure Device A is not operating during unintended periods."
    },
    {
        device: "Device B",
        time: "11:00 AM",
        wattage: 800,
        extra: "Device B has been identified as a high energy consumer. It is recommended to ensure Device B is not operating during unintended periods."
    },
    // ... add more notices here
];

const StyledList = styled(List)(() => ({
    ...tw`mt-8`,
}));

const StyledButton = styled(Button)(() => ({
    ...tw`hover:bg-blue-200 transition-colors duration-200 ease-in-out rounded-md my-1 w-full text-left`,
    justifyContent: 'flex-start',
}));

const DeviceText = styled('span')(() => ({
    ...tw`text-xl text-blue-500`,
    fontFamily: 'monospace',
}));

const WattageText = styled('span')(() => ({
    ...tw`text-xl text-blue-500`,
    fontFamily: 'monospace',
}));

const NoticeText = styled('span')(() => ({
    ...tw`text-xl text-gray-700`,
    fontFamily: 'monospace',
}));

const ExtraText = styled(Typography)(() => ({
    ...tw`text-sm pl-4`,
    fontFamily: 'monospace',
}));

const StyledCollapse = styled(Collapse)(() => ({
    ...tw`mb-2`,
}));


export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [openNoticeIndex, setOpenNoticeIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenNoticeIndex(openNoticeIndex === index ? null : index);
    };

    useEffect(() => {
        // Load notices from localStorage
        const savedNotices = JSON.parse(localStorage.getItem('notices') || '[]');
        setNotices(savedNotices);
        setNotices(dummyNotices);

        // Clear notices from localStorage
        localStorage.setItem('notices', '[]');
    }, []);

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StyledList>
                        {notices.map((notice, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <StyledButton onClick={() => handleClick(index)}>
                                        <DeviceText>{notice.device}</DeviceText>&nbsp;
                                        <NoticeText>&nbsp;was turned on at {notice.time}. It was measured at&nbsp;</NoticeText>
                                        <WattageText>{notice.wattage}</WattageText>
                                        <NoticeText>&nbsp;watts.</NoticeText>
                                    </StyledButton>
                                </ListItem>
                                <StyledCollapse in={Boolean(openNoticeIndex === index)} timeout="auto" unmountOnExit>
                                    <ExtraText>{notice.extra}</ExtraText>
                                </StyledCollapse>
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </StyledList>
                </Grid>
            </Grid>
        </Layout>
    );
}
