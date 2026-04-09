
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  confirmation_token uuid DEFAULT gen_random_uuid(),
  confirmed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  confirmed_at timestamptz,
  UNIQUE(email)
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow read by token" ON public.newsletter_subscribers
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow confirmation update" ON public.newsletter_subscribers
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
