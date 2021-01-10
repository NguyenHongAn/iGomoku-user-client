import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logoIGomoku from "../../assets/img/logo-igomoku.png";
import axiosInstance from "../../api";
import { useToasts } from "react-toast-notifications";

function VerifyMailPage() {
  // redux
  const { userId } = useSelector((state) => ({
    jwtToken: state.auth.jwtToken,
    fullname: state.auth.fullname,
    userId: state.auth.userID,
  }));
  const params = useParams();
  useEffect(() => {
    axiosInstance
      .post(`/auth/verified-email`, {
        userId: userId,
        decodekey: params.decodekey,
      })
      .then(function (response) {
        if (response.status === 200) {
          //   addToast("An email was sent, please check your mail box", {
          //     appearance: "success",
          //     autoDismiss: true,
          //   });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <title />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n        @media screen {\n            @font-face {\n                font-family: 'Lato';\n                font-style: normal;\n                font-weight: 400;\n                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');\n            }\n\n            @font-face {\n                font-family: 'Lato';\n                font-style: normal;\n                font-weight: 700;\n                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');\n            }\n\n            @font-face {\n                font-family: 'Lato';\n                font-style: italic;\n                font-weight: 400;\n                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');\n            }\n\n            @font-face {\n                font-family: 'Lato';\n                font-style: italic;\n                font-weight: 700;\n                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');\n            }\n        }\n\n        /* CLIENT-SPECIFIC STYLES */\n        body,\n        table,\n        td,\n        a {\n            -webkit-text-size-adjust: 100%;\n            -ms-text-size-adjust: 100%;\n        }\n\n        table,\n        td {\n            mso-table-lspace: 0pt;\n            mso-table-rspace: 0pt;\n        }\n\n        img {\n            -ms-interpolation-mode: bicubic;\n        }\n\n        /* RESET STYLES */\n        img {\n            border: 0;\n            height: auto;\n            line-height: 100%;\n            outline: none;\n            text-decoration: none;\n        }\n\n        table {\n            border-collapse: collapse !important;\n        }\n\n        body {\n            height: 100% !important;\n            margin: 0 !important;\n            padding: 0 !important;\n            width: 100% !important;\n        }\n\n        /* iOS BLUE LINKS */\n        a[x-apple-data-detectors] {\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n\n        /* MOBILE STYLES */\n        @media screen and (max-width:600px) {\n            h1 {\n                font-size: 32px !important;\n                line-height: 32px !important;\n            }\n        }\n\n        /* ANDROID CENTER FIX */\n        div[style*=\"margin: 16px 0;\"] {\n            margin: 0 !important;\n        }\n    ",
        }}
      />
      {/* HIDDEN PREHEADER TEXT */}
      <div
        style={{
          display: "none",
          fontSize: "1px",
          color: "#fefefe",
          lineHeight: "1px",
          fontFamily: '"Lato", Helvetica, Arial, sans-serif',
          maxHeight: "0px",
          maxWidth: "0px",
          opacity: 0,
          overflow: "hidden",
        }}
      >
        {" "}
        We're thrilled to have you here! Get ready to dive into your new
        account.{" "}
      </div>
      <table border={0} cellPadding={0} cellSpacing={0} width="100%">
        {/* LOGO */}
        <tbody>
          <tr>
            <td bgcolor="#FFA73B" align="center">
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      valign="top"
                      style={{ padding: "40px 10px 40px 10px" }}
                    >
                      {" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              bgcolor="#FFA73B"
              align="center"
              style={{ padding: "0px 10px 0px 10px" }}
            >
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="center"
                      valign="top"
                      style={{
                        padding: "40px 20px 20px 20px",
                        borderRadius: "4px 4px 0px 0px",
                        color: "#111111",
                        fontFamily: '"Lato", Helvetica, Arial, sans-serif',
                        fontSize: "48px",
                        fontWeight: 400,
                        letterSpacing: "4px",
                        lineHeight: "48px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "48px",
                          fontWeight: 400,
                          marginBottom: 10,
                        }}
                      >
                        Welcome to
                      </h1>{" "}
                      <img
                        src={logoIGomoku}
                        width={375}
                        height={360}
                        style={{ display: "block", border: "0px" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              bgcolor="#f4f4f4"
              align="center"
              style={{ padding: "0px 10px 0px 10px" }}
            >
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#ffffff"
                      align="left"
                      style={{
                        padding: "20px 30px 40px 30px",
                        color: "#666666",
                        fontFamily: '"Lato", Helvetica, Arial, sans-serif',
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "25px",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        Your account has been verified and activated. Now you
                        have full access to the account, and able to use{" "}
                        <i>Forgot Password</i> feature.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" align="left">
                      <table
                        width="100%"
                        border={0}
                        cellSpacing={0}
                        cellPadding={0}
                      >
                        <tbody>
                          <tr>
                            <td
                              bgcolor="#ffffff"
                              align="center"
                              style={{ padding: "20px 30px 60px 30px" }}
                            >
                              <table border={0} cellSpacing={0} cellPadding={0}>
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style={{ borderRadius: "3px" }}
                                      bgcolor="#FFA73B"
                                    >
                                      <Link
                                        to="/"
                                        style={{
                                          fontSize: "20px",
                                          fontFamily:
                                            "Helvetica, Arial, sans-serif",
                                          color: "#ffffff",
                                          textDecoration: "none",
                                          padding: "15px 25px",
                                          borderRadius: "2px",
                                          border: "1px solid #FFA73B",
                                          display: "inline-block",
                                        }}
                                      >
                                        Okay!!!
                                      </Link>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>{" "}
                  {/* COPY */}
                  <tr></tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              bgcolor="#f4f4f4"
              align="center"
              style={{ padding: "30px 10px 0px 10px" }}
            >
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#FFECD1"
                      align="center"
                      style={{
                        padding: "30px 30px 30px 30px",
                        borderRadius: "4px 4px 4px 4px",
                        color: "#666666",
                        fontFamily: '"Lato", Helvetica, Arial, sans-serif',
                        fontSize: "18px",
                        fontWeight: 400,
                        lineHeight: "25px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "20px",
                          fontWeight: 400,
                          color: "#111111",
                          margin: 0,
                        }}
                      >
                        Hope you have great time with{" "}
                        <a
                          href="#"
                          target="_blank"
                          style={{ color: "#111111", fontWeight: 700 }}
                        >
                          iGomoku
                        </a>
                      </h2>
                      <p style={{ margin: 0 }}>
                        <a
                          href="#"
                          target="_blank"
                          style={{ color: "#FFA73B" }}
                        >
                          We’re here to help you out
                        </a>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              bgcolor="#f4f4f4"
              align="center"
              style={{ padding: "0px 10px 0px 10px" }}
            >
              <table
                border={0}
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: "600px" }}
              >
                <tbody>
                  <tr>
                    <td
                      bgcolor="#f4f4f4"
                      align="left"
                      style={{
                        padding: "0px 30px 30px 30px",
                        color: "#666666",
                        fontFamily: '"Lato", Helvetica, Arial, sans-serif',
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "18px",
                      }}
                    >
                      {" "}
                      <br />
                      <p style={{ margin: 0 }}>
                        {" "}
                        <a
                          href="#"
                          target="_blank"
                          style={{ color: "#111111", fontWeight: 700 }}
                        >
                          iGomoku
                        </a>
                        .
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default VerifyMailPage;
