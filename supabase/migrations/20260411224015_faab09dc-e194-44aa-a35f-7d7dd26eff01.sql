
CREATE TABLE public.article_poll_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  article_slug text NOT NULL,
  response text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.article_poll_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.article_poll_responses
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow anonymous reads" ON public.article_poll_responses
  FOR SELECT TO anon, authenticated USING (true);
