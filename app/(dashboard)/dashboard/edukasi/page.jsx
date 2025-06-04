"use client";
import { Button } from "@/components/ui/button";
import { getAllArticles } from "@/lib/article-actions";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await getAllArticles();
        console.log(response.data);
        setArticles(response.data.articles);
      } catch (err) {
        console.error(err);
        toast("error mendapatkan article edukasi");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Edukasi
            </h1>
          </div>
        </div>

        <div className="grid gird-cols-1 lg:grid-cols-3 md:gap-5">
          {articles.map((article, id) => (
            <div key={id} className="p-1">
              <div className={"border-0 bg-transparent"}>
                <Image
                  width={500}
                  height={500}
                  src={article.thumbnail}
                  className="rounded-md w-full h-80 object-cover"
                  alt="article thumbnail"
                />
                <div className="flex flex-col items-start py-2 px-2">
                  <h3 className="text-2xl font-semibold">
                    <a href={`/article/${article.slug}`}>{article.title}</a>
                  </h3>

                  <div className="flex mt-5 text-muted-foreground w-full items-center justify-between">
                    <p>{article.author}</p>
                    <p>{article.read_minutes} Menit</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
