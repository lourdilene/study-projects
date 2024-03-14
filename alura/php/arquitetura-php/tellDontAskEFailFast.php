<?php
class PostJaPublicadoException extends \DomainException{}
class PostStatus{}
class Post{
    private $status = PostStatus::RASCUNHO;

    public function publica(){
        if ($this->status !== PostStatus::RASCUNHO){
            throw new PostJaPublicadoException();            
        }
        $this->status = PostStatus::PUBLICADO;
    }
}

$post = new Post();
$post->publica();
