import { Container, MainLayout } from "@/components/Layout";

export default function PrintPage() {
  return (
    <MainLayout>
      <Container className="flex-col pt-16 sm:pt-24">
        <div className="prose lg:prose-xl max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            About this Directory Demo (for Sam)
          </h2>
          <p>
            This is a demo version of a directory app I built for a church,
            where the data is sourced from a Google Sheet, and the app itself
            can be installed as a PWA or just used as a desktop webpage. It has
            authentication, which I removed, and it loads the full directory
            data into IndexedDB upon successful login, allowing the user to run
            it completely offline in perpetuity (with intermittent background
            synchronizations when online).
          </p>
          <p>
            I stripped quite a bit of extra functionality out of this demo, but
            the main <strong>"Digital Directory" view</strong> functionality is
            pretty much all untouched.
          </p>
          <p>
            Basically, on desktop, the goal was to have a proper
            sidebar/slide-out to show a detailed view of the household, and on
            mobile it would just look like a new screen.{" "}
            <strong>
              The biggest complication came from wanting to show/hide that
              detailed view on forward/back navigation.
            </strong>
          </p>
          <p>The 2 "clunky" UX bits are:</p>
          <ol>
            <li>
              How to present a household's details, given there are some
              households with only one person, and some households with multiple
              people, plus there is considerably more information about some
              households than others.
            </li>
            <li>
              Ensuring the slide-out would show/hide (with animations) as
              expected when navigating forward/back.
              <ul>
                <li>
                  This is <strong>mostly</strong> functional today; you can see
                  the logic in the <code>DigitalDirectory</code> component,
                  where I'm using <code>useRouter()</code> and{" "}
                  <code>useSearchParams()</code>, and a{" "}
                  <code>&lt;Link&gt;</code> to set the query string in the{" "}
                  <code>HouseholdListing</code> component.
                </li>
                <li>
                  So far I have not come up with a solution for ensuring the
                  "close" animation is triggered when using the back button,
                  though, but the "open" animation works just fine when
                  navigating forward...
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </Container>
    </MainLayout>
  );
}
