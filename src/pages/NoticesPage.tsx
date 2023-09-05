import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, List, ListItem, Divider, Collapse, Typography, Button, Popover } from "@mui/material";
import { styled } from "@mui/system";
import tw from 'twin.macro';
import { Notice } from '../components/types';
import {CheckCircleOutline} from "@mui/icons-material";

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
        // setNotices(dummyNotices);

        // Clear notices from localStorage
        localStorage.setItem('notices', '[]');
    }, []);

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {notices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <CheckCircleOutline className="text-green-500" />
                            <Typography variant="h6">No notices right now!</Typography>
                        </div>
                    ) : (
                        <StyledList>
                            {notices.map((notice, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <StyledButton onClick={() => handleClick(index)}>
                                            <DeviceText>{notice.device}</DeviceText>&nbsp;
                                            <NoticeText>&nbsp;was turned on at {notice.time}. It was predicted at&nbsp;</NoticeText>
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
                    )}
                </Grid>
            </Grid>
        </Layout>
    );
}
