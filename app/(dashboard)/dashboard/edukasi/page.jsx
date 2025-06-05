"use client";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleGridSkeleton from "@/components/article/ArticleGridSkeleton";
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

        {loading ? (
          <ArticleGridSkeleton cols={6} />
        ) : (
          <div className="grid gird-cols-1 md:grid-cols- lg:grid-cols-3 gap-5">
            {articles.map((article, id) => (
              <ArticleCard key={id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
