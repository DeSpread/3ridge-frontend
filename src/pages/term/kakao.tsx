import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";

import MainLayout from "@/layouts/main-layout";

function TermKakao() {
  return (
    <>
      <Head>
        <title>3ridge : Web3 온보딩 플랫폼</title>
      </Head>
      <div className="mx-auto mt-20 max-w-7xl px-20">
        <Typography typography={"h3"}>카카오 계정 연동 약관</Typography>
        <hr className="mb-10" />
        <div>
          <Typography typography={"h5"}>
            (필수) 개인정보 수집·이용 동의
          </Typography>
          <Typography className="mt-5">
            당사는 귀하의 개인정보를 수집하고 저장하기 위해 아래와 같은 항목을
            수집하고자 합니다. 동의하지 않을 경우 관련 서비스의 이용이 제한될 수
            있습니다. 더 자세한 정보나 궁금한 사항이 있으신 경우{" "}
            <Link href="mailto:support@3ridge.io">support@3ridge.io</Link>로
            연락 주시기 바랍니다.
          </Typography>
          <Table className="mt-5">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  개인정보 수집 항목
                </TableCell>
                <TableCell>
                  카카오 계정, 이메일, 트위터, 디스코드 ID, 전화번호, 지갑 주소
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  이용 및 수집 목적
                </TableCell>
                <TableCell>
                  이벤트 정보 및 경품 제공, 온체인 데이터 가공
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  보유 및 이용 기간
                </TableCell>
                <TableCell>계정 탈퇴 후 1년까지</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-20">
          <Typography typography={"h5"}>
            (선택) 마케팅 정보 수신 동의
          </Typography>
          <Typography className="mt-5">
            당사는 귀하의 개인정보를 안전하게 보호하고 최신 이벤트 정보, 특별
            프로모션, 경품 제공 등의 서비스를 제공하기 위해 마케팅 정보 수신
            동의를 받고자 합니다. 더 자세한 정보나 궁금한 사항이 있으신 경우{" "}
            <Link href="mailto:support@3ridge.io">support@3ridge.io</Link>로
            연락 주시기 바랍니다.
          </Typography>
          <Typography>
            (마케팅 정보 수신에 동의하지 않을 경우 이벤트 상품을 수령하실 수
            없습니다)
          </Typography>
          <Table className="mt-5">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  개인정보 수집 항목
                </TableCell>
                <TableCell>
                  카카오 계정, 이메일, 트위터, 디스코드 ID, 지갑 주소, 전화번호,
                  마케팅 수신 동의 여부
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  이용 및 수집 목적
                </TableCell>
                <TableCell>
                  이벤트 정보 및 경품 제공, 온체인 데이터 가공
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  보유 및 이용 기간
                </TableCell>
                <TableCell>계정 탈퇴 후 1년까지</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

TermKakao.getLayout = (page: ReactElement | ReactElement[]) => (
  <MainLayout>{page}</MainLayout>
);

export default TermKakao;
