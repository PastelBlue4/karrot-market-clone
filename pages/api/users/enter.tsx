import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { emit } from "process";

const sendEmail = require("@sendgrid/mail");

sendEmail.setApiKey(process.env.SENDGRID_API_KEY);

interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const user = { email };
  console.log(user);
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: { name: "gest", ...user },
        },
      },
    },
  });

  await sendEmail
    .send({
      to: user,
      from: "pastelblue0721@gmail.com",
      subject: "캐럿마켓 인증 메일입니다.",
      html: `<div>
      <!--[if gte mso 9]> <![endif]-->
    
      <!--[if !mso]><!-- -->
      <xlink
        href="https://fonts.googleapis.com/css?family=Inter:300,400,600,700"
        rel="stylesheet"
      >
        <xlink rel="preconnect" href="https://fonts.gstatic.com">
          <!--&lt;![endif]-->
    
          <!--[if mso]> <![endif]-->
    
          <!--  -->
    
          <div style="font-size: 1px; display: none !important"></div>
          <div style="font-size: 0; line-height: 0">
            <img
              src="https://click.ship.vercel.com/open.aspx?ffcb10-fefb1c73706705-fe6417747666067f7012-fe3411727364047c761777-ff8e1d78-fe2915747462077b731d72-fed015737466057a&amp;d=120010&amp;bmt=0"
              width="1"
              height="1"
              alt=""
              loading="lazy"
            />
          </div>
    
          <div
            style="display: none; max-height: 0; overflow: hidden; mso-hide: all"
          >
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
          </div>
          <img
            src="https://click.ship.vercel.com/open.aspx?ffcb10-fefb1c73706705-fe6417747666067f7012-fe3411727364047c761777-ff8e1d78-fe2915747462077b731d72-fed015737466057a&amp;d=120010&amp;bmt=0"
            width="1"
            height="1"
            alt=""
            loading="lazy"
          />
          <div></div>
          <img
            src="https://aknfzofk.emltrk.com/v2/aknfzofk?i=141636692"
            width="1"
            height="1"
            border="0"
            alt=""
            loading="lazy"
          />
          <table
            width="100%"
            border="0"
            cellspacing="0"
            cellpadding="0"
            bgcolor="#FFFFFF"
          >
            <tbody>
              <tr>
                <td align="left" valign="top">
                  <table
                    align="left"
                    width="650"
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    bgcolor="#FFFFFF"
                    style="width: 650px; table-layout: fixed"
                  >
                    <tbody>
                      <tr>
                        <td align="center" valign="top"></td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; border: 0px">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td align="left" valign="top">
                                  <table
                                    align="left"
                                    bgcolor="#FFFFFF"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="width: 650px"
                                    width="650"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="left"
                                          valign="top"
                                          style="padding: 0px 25px"
                                        >
                                          <table
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                          >
                                            <tbody>
                                              <tr>
                                                <td align="left" valign="top">
                                                  <table
                                                    align="left"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="width: 100px"
                                                    width="100"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          height="18"
                                                          style="
                                                            font-size: 1px;
                                                            line-height: 1px;
                                                            height: 18px;
                                                          "
                                                        >
                                                          <img
                                                            alt=""
                                                            border="0"
                                                            height="1"
                                                            src="#"
                                                            style="display: block"
                                                            width="1"
                                                            loading="lazy"
                                                          />
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          align="left"
                                                          valign="top"
                                                        >
                                                          <a
                                                            href="https://click.ship.vercel.com/?qs=dd83f5ef80ee324539019872b289fdfbbf94ee460011732576c83019b48cbcc21e2d8601ce8d1c0977869289daf171759bb3f11349d2dbde"
                                                            style="
                                                              text-decoration: none;
                                                            "
                                                            target="_blank"
                                                            rel="noreferrer noopener"
                                                            ><img
                                                              alt="Vercel"
                                                              border="0"
                                                              src="https://image.ship.vercel.com/lib/fe3411727364047c761777/m/1/d1a045de-0a88-4fc0-a7fa-1f2fe145af4b.png"
                                                              style="
                                                                display: block;
                                                                font-family: 'inter',
                                                                  helvetica,
                                                                  sans-serif;
                                                                font-size: 18px;
                                                                line-height: 30px;
                                                                color: #424242;
                                                                max-width: 50px;
                                                              "
                                                              width="50"
                                                              loading="lazy"
                                                          /></a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" valign="top">
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="min-width: 100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <table
                                            align="left"
                                            bgcolor="#FFFFFF"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="width: 650px"
                                            width="650"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  valign="top"
                                                  style="padding: 0px 25px"
                                                >
                                                  <table
                                                    align="center"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          height="24"
                                                          style="
                                                            font-size: 1px;
                                                            line-height: 1px;
                                                          "
                                                        >
                                                          <img
                                                            alt=""
                                                            border="0"
                                                            height="1"
                                                            src="#"
                                                            style="display: block"
                                                            width="1"
                                                            loading="lazy"
                                                          />
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          height="15"
                                                          style="
                                                            font-size: 1px;
                                                            line-height: 1px;
                                                          "
                                                        >
                                                          <img
                                                            alt=""
                                                            border="0"
                                                            height="1"
                                                            src="#"
                                                            style="display: block"
                                                            width="1"
                                                            loading="lazy"
                                                          />
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          align="left"
                                                          valign="top"
                                                          style="
                                                            font-family: 'inter',
                                                              helvetica, sans-serif;
                                                            font-size: 16px;
                                                            line-height: 24px;
                                                            color: #000000;
                                                            font-weight: 400;
                                                          "
                                                        >
                                                          <br />
                                                          캐럿마켓 인증번호 입니다.
    
                                                          <br />
                                                          <strong
                                                            href="https://click.ship.vercel.com/?qs=6eb7662cc809289d69f22decb6fb180051d7895f790257627d4476917df1b1eebe409eaa8773381b533fe05d0265ce137fadcd9be583c48f"
                                                            style="
                                                              text-decoration: none;
                                                              color: #f9bd3c;
                                                              font-weight: 600;
                                                            "
                                                            target="_blank"
                                                            rel="noreferrer noopener"
                                                            >인증번호를 화면에
                                                            보이는 입력창에 정확히
                                                            입력해주세요.</strong
                                                          >
                                                          <br />
                                                          <br />
                                                          <strong>${payload}</strong>
                                                          <br />
                                                          타인에게 절대 인증번호를
                                                          공유하지 마세요!
                                                          <br />
                                                          <br />
                                                          <br />
                                                          시간내어 포트폴리오를
                                                          봐주셔서 감사합니다! 지금
                                                          보고계신 프로젝트는
                                                          <a
                                                            href="https://github.com/PastelBlue4/karrot-market-clone"
                                                            style="
                                                              text-decoration: none;
                                                              color: #41b2f8;
                                                              font-weight: 600;
                                                            "
                                                            target="_blank"
                                                            rel="noreferrer noopener"
                                                            >github.com/PastelBlue4/karrot-market-clone</a
                                                          >
                                                          에서 더 자세히 보실 수
                                                          있습니다.
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="min-width: 100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <table
                                            align="left"
                                            bgcolor="#ffffff"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="
                                              width: 600px;
                                              table-layout: fixed;
                                              background-color: #ffffff;
                                            "
                                            width="600"
                                          >
                                            <tbody>
                                              <tr>
                                                <td align="left" valign="top">
                                                  <table
                                                    align="left"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="width: 600px"
                                                    width="600"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="left"
                                                          valign="top"
                                                          style="padding: 0px 0px"
                                                        >
                                                          <!-- Button Start -->
                                                          <table
                                                            align="left"
                                                            border="0"
                                                            cellpadding="30"
                                                            cellspacing="0"
                                                            width="100%"
                                                          >
                                                            <tbody>
                                                              <tr>
                                                                <td
                                                                  align="left"
                                                                  valign="top"
                                                                >
                                                                  <table
                                                                    align="left"
                                                                    border="0"
                                                                    cellpadding="0"
                                                                    cellspacing="0"
                                                                    style="
                                                                      width: 142px;
                                                                    "
                                                                    width="142"
                                                                  >
                                                                    <tbody>
                                                                      <tr>
                                                                        <td
                                                                          align="left"
                                                                          valign="top"
                                                                        >
                                                                          <table
                                                                            align="left"
                                                                            border="0"
                                                                            cellpadding="0"
                                                                            cellspacing="0"
                                                                            style="
                                                                              width: 200px;
                                                                            "
                                                                            width="200"
                                                                          >
                                                                            <tbody>
                                                                              <tr></tr>
                                                                            </tbody>
                                                                          </table>
                                                                        </td>
                                                                      </tr>
                                                                    </tbody>
                                                                  </table>
                                                                </td>
                                                              </tr>
                                                            </tbody>
                                                          </table>
                                                          <!-- Button End  -->
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="min-width: 100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <table
                                            align="left"
                                            bgcolor="#FFFFFF"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            style="width: 650px"
                                            width="650"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="center"
                                                  valign="top"
                                                  style="padding: 0px 25px"
                                                >
                                                  <table
                                                    align="center"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    width="100%"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          align="left"
                                                          valign="top"
                                                          style="
                                                            font-family: 'inter',
                                                              helvetica, sans-serif;
                                                            font-size: 16px;
                                                            line-height: 24px;
                                                            color: #000000;
                                                            font-weight: 400;
                                                          "
                                                        >
                                                          <br />
                                                          캐럿마켓 드림
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td
                                                          height="25"
                                                          style="
                                                            font-size: 1px;
                                                            line-height: 1px;
                                                          "
                                                        >
                                                          <img
                                                            alt=""
                                                            border="0"
                                                            height="1"
                                                            src="#"
                                                            style="display: block"
                                                            width="1"
                                                            loading="lazy"
                                                          />
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" valign="top">
                                  <table
                                    align="left"
                                    bgcolor="#FFFFFF"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="width: 650px"
                                    width="650"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0px 25px"
                                        >
                                          <table
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  align="left"
                                                  valign="top"
                                                  style="
                                                    font-family: 'inter', helvetica,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    line-height: 19px;
                                                    color: #606060;
                                                    font-weight: 500;
                                                  "
                                                >
                                                  <hr />
                                                  <br /><br />
                                                  Vercel Inc.<br />
                                                  340 S Lemon Ave #4133 <br />
                                                  Walnut, California 91789
                                                  <br />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  height="18"
                                                  style="
                                                    font-size: 1px;
                                                    line-height: 1px;
                                                  "
                                                >
                                                  <img
                                                    alt=""
                                                    border="0"
                                                    height="1"
                                                    src="#"
                                                    style="display: block"
                                                    width="1"
                                                    loading="lazy"
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  align="left"
                                                  valign="top"
                                                  style="
                                                    font-family: 'inter', helvetica,
                                                      sans-serif;
                                                    font-size: 12px;
                                                    line-height: 18px;
                                                    color: #606060;
                                                    font-weight: 500;
                                                  "
                                                >
                                                  We respect your right to privacy.
                                                  View our
                                                  <a
                                                    href="https://click.ship.vercel.com/?qs=80e9bc29851f3a6bdbf2561ea658352c8e56fc03db852c939b43a570528b99d4150a01e5ae05e33f91176e7899bae899b768a718bffd3be9"
                                                    style="
                                                      text-decoration: none;
                                                      color: #505050;
                                                      font-weight: 600;
                                                    "
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    >privacy policy</a
                                                  >,
                                                  <a
                                                    href="https://click.ship.vercel.com/?qs=59c93b089efc564bc8d91b7fb676919d5459c9e0087e6104d1c8c327d5f5e83b72bf5a121ea5a7b51983ee9085222dc79d5ab69f14cdf74b"
                                                    style="
                                                      text-decoration: none;
                                                      color: #505050;
                                                      font-weight: 600;
                                                    "
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    >unsubscribe</a
                                                  >
                                                  from all messages, or
                                                  <a
                                                    href="https://click.ship.vercel.com/?qs=42875497cfb71f5fb4e67b08eb41e9cdb7a440a5b21e53a1552c164594a77ea3450b06b522c3bfbc6a20ad05ea38c93ef58c53f3dc1cd3c1"
                                                    style="
                                                      text-decoration: none;
                                                      color: #505050;
                                                      font-weight: 600;
                                                    "
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    >update your subscriptions</a
                                                  >. You are receiving important
                                                  product and security updates from
                                                  this mailing list.
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  height="30"
                                                  style="
                                                    font-size: 1px;
                                                    line-height: 1px;
                                                  "
                                                >
                                                  <img
                                                    alt=""
                                                    border="0"
                                                    height="1"
                                                    src="#"
                                                    style="display: block"
                                                    width="1"
                                                    loading="lazy"
                                                  />
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" valign="top"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table> </xlink
      ></xlink>
    </div>
    `,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.log(error);
    });

  return res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
