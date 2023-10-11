import React from "react";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import RawHTMLRenderer from "../components/HtmlRenderer";

const About = () => {
  const contents = useSelector((state) => state.content?.data);
  let about;
  contents?.map((c) => {
    if (c?.title === "about") {
      about = c?.content;
    }
  });
  return (
    <>
      <Box
        sx={{
          height: "12.3vh",
          width: "100%",
          // display: { xs: "block", sm: "none" },
        }}
      />
      <RawHTMLRenderer html={about} />
      {/* <div
        style={{
          padding: "20px 25px",
          textAlign: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ textAlign: "left" }}>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "800" }}
            >
              About XTRACK
            </Typography>
          </div>
          <div style={{ textAlign: "left", fontFamily: "Poppins, sans-serif" }}>
            <span className="text-small text-secondary py-lg-3">
              At <strong className="text-uppercase text-dark">XTRACK</strong>,
              your satisfaction and well-being are our top priorities. We take
              the guesswork out of finding the right supplements by offering
              only products that have undergone rigorous testing and quality
              checks. Our user-friendly interface makes browsing and shopping a
              breeze, so you can spend less time searching and more time hitting
              the gym. Join the community of fitness enthusiasts who trust
              XTRACK to provide them with the fuel they need to conquer their
              goals. Whether you're aiming for gains, endurance, or overall
              wellness, we're here to empower you on your fitness journey. Ready
              to take the next step? Start browsing our collection now and
              embark on a path to a stronger, healthier you!
            </span>
            <div className="text-center text-uppercase fw-bold fs-3 py-3">
              <span>Our Goal</span>
            </div>
            <div className="fw-bold fs-5 pt-3">
              <span>
                Empowering Your Fitness Journey: Our Mission at XTRACK
              </span>
            </div>
            <span className="text-small text-secondary">
              At XTRACK, our mission is clear: to be your steadfast partner on
              your fitness expedition in Pakistan. We understand the unique
              challenges and aspirations that come with pursuing a healthier
              lifestyle in our country, and we are here to provide the solutions
              you need to thrive.
            </span>
            <br />
            <div className="fw-bold fs-5 pt-3">
              <span>What Sets Us Apart?</span>
            </div>
            <div className="text-small text-secondary py-2">
              <ol>
                <li>
                  <strong>Localized Expertise: </strong>
                  <span>
                    Our team is deeply rooted in the Pakistani fitness scene. We
                    understand the dietary preferences, workout routines, and
                    cultural aspects that shape your fitness journey here. This
                    knowledge allows us to recommend supplements that align with
                    your goals and lifestyle.
                  </span>
                </li>
                <li>
                  <strong>Trusted Selection: </strong>
                  <span>
                    We curate a meticulously chosen range of gym supplements
                    that are not only popular worldwide but also cater to the
                    preferences of individuals in Pakistan. Each product is
                    selected based on its quality, effectiveness, and relevance
                    to the Pakistani fitness community.
                  </span>
                </li>
                <li>
                  <strong>Accessibility: </strong>
                  <span>
                    We believe that everyone should have access to high-quality
                    supplements, regardless of their location. That's why we
                    offer convenient nationwide delivery, ensuring that
                    top-notch fitness support reaches every corner of Pakistan.
                  </span>
                </li>
                <li>
                  <strong>Guidance for All: </strong>
                  <span>
                    Whether you're a beginner taking your first steps towards a
                    healthier lifestyle or an experienced athlete aiming for
                    peak performance, we have the right guidance for you. Our
                    personalized recommendations and informative resources cater
                    to diverse fitness levels and goals.
                  </span>
                </li>
                <li>
                  <strong>Community Building: </strong>
                  <span>
                    XTRACK isn't just a place to shop; it's a hub for the
                    Pakistani fitness community. Join us to connect with
                    like-minded individuals, access informative articles, and
                    stay up-to-date with the latest fitness trends.
                  </span>
                </li>
                <li>
                  <strong>Local Support: </strong>
                  <span>
                    Our customer support team is readily available to address
                    your queries, concerns, and product-related questions. We're
                    committed to ensuring your shopping experience is smooth,
                    convenient, and enjoyable.
                  </span>
                </li>
              </ol>
            </div>
            <div className="fw-bold fs-5 pt-3">
              <span>Join Us in Redefining Fitness in Pakistan:</span>
            </div>
            <span className="text-small text-secondary">
              In a nation that's embracing fitness and wellness more than ever,
              XTRACK is here to provide the support you need to achieve your
              fitness aspirations. Whether you're aiming to build muscle, shed
              those extra pounds, or simply lead a healthier life, we're
              dedicated to being your reliable source of authentic and effective
              gym supplements.
            </span>
            <br />
            <br />
            <span className="text-small text-secondary">
              Ready to embark on a transformational journey that celebrates
              strength, resilience, and progress? Browse our carefully selected
              collection and take the first step towards a fitter, stronger you.
              At XTRACK, we're with you every step of the way.
            </span>
            <div className="text-center text-uppercase fw-bold fs-3 pt-5 pb-3">
              <span>
                Start today and redefine your fitness journey in Pakistan with
                XTRACK!
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default About;
